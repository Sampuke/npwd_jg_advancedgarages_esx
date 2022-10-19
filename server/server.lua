local QBCore = exports['qb-core']:GetCoreObject()

RegisterNetEvent("npwd:jg-advancedgarages:getVehicles", function()
  local src = source
  local Player = QBCore.Functions.GetPlayer(src)
  local garageresult = MySQL.query.await('SELECT * FROM player_vehicles WHERE citizenid = ? AND job_vehicle = ? AND gang_vehicle = ?',
      {Player.PlayerData.citizenid, 0, 0})

  if garageresult[1] ~= nil then
    for _, v in pairs(garageresult) do
      local vehicleModel = v.vehicle
      v.model = vehicleModel
      v.vehicle = v.vehicle
      v.brand = ""
      v.garage = v.garage_id

      if QBCore.Shared.Vehicles[vehicleModel] then
        v.vehicle = QBCore.Shared.Vehicles[vehicleModel].name
        v.brand = QBCore.Shared.Vehicles[vehicleModel].brand
      end

      if v.impound == 1 then
        v.state = "impound"
        v.garage = json.decode(v.impound_data).reason
      elseif v.in_garage then
        v.state = "in garage"
      else
        v.state = "not in garage"
      end
    end

    TriggerClientEvent('npwd:jg-advancedgarages:sendVehicles', src, garageresult)
  end
end)
