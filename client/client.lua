local ESX = exports['es_extended']:getSharedObject()



local function findVehFromPlateAndLocate(plate)
  local gameVehicles = GetGamePool('CVehicle')
  for i = 1, #gameVehicles do
    local vehicle = gameVehicles[i]
    if DoesEntityExist(vehicle) then
      if ESX.Math.Trim(GetVehicleNumberPlateText(vehicle)) == plate then
        local vehCoords = GetEntityCoords(vehicle)
        SetNewWaypoint(vehCoords.x, vehCoords.y)
        return true
      end
    end
  end
end

RegisterNUICallback("npwd:jg-advancedgarages:getVehicles", function(_, cb)
  TriggerServerEvent("npwd:jg-advancedgarages:getVehicles")
  RegisterNetEvent("npwd:jg-advancedgarages:sendVehicles", function(vehicles)
    for _, v in pairs(vehicles) do
      local type = GetVehicleClassFromName(v.model)
      if type == 15 or type == 16 then
        v.type = "aircraft"
      elseif type == 14 then
        v.type = "boat"
      elseif type == 13 or type == 8 then
        v.type = "bike"
      else
        v.type = "car"
      end
    end

    cb({
      status = "ok",
      data = vehicles
    })
  end)
end)

RegisterNUICallback("npwd:jg-advancedgarages:requestWaypoint", function(data, cb)
  local plate = data.plate
  if findVehFromPlateAndLocate(plate) then
      exports["npwd"]:createSystemNotification({
        uniqId = "markedveh",
        content = "Your vehicle has been marked",
        secondaryTitle = "Vehicle",
        keepOpen = false,
        duration = 5000,
        controls = false,
      })
  else
       exports["npwd"]:createSystemNotification({
        uniqId = "markedveh",
        content = "This vehicle cannot be located",
        secondaryTitle = "Vehicle",
        keepOpen = false,
        duration = 5000,
        controls = false,
      })
  end
  cb({})
end)
