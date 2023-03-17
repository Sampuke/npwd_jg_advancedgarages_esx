local ESX = exports['es_extended']:getSharedObject()

RegisterNetEvent("npwd:jg-advancedgarages:getVehicles", function()
  local src = source
  local Player = ESX.GetPlayerFromId(src)
  local garageresult = MySQL.query.await('SELECT * FROM owned_vehicles WHERE owner = ? AND job_vehicle = ? AND gang_vehicle = ?',
      {Player.PlayerData.citizenid, 0, 0})

  if garageresult[1] ~= nil then
    for _, v in pairs(garageresult) do
      local vehicleModel = v.vehicle
      v.model = vehicleModel
      v.vehicle = v.vehicle
      v.brand = ""
      v.garage = v.garage_id
      local v.vehicle = GetLabelText(GetDisplayNameFromVehicleModel(vehicleModel))
      local v.brand = GetLabelText(GetMakeNameFromVehicleModel(vehicleModel))

      if v.vehicle == "NULL" then
        v.vehicle = GetDisplayNameFromVehicleModel(vehicleModel)
        v.brand = GetMakeNameFromVehicleModel(vehicleModel)
      end
        
      if v.impound == 1 then
        v.state = "impound"
        v.impound_reason = json.decode(v.impound_data).reason
      elseif v.in_garage then
        v.state = "parked"
      else
        v.state = "out"
      end
    end

    TriggerClientEvent('npwd:jg-advancedgarages:sendVehicles', src, garageresult)
  end
end)
