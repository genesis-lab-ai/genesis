def serialize_city(city):

    zones = []

    for zone in city.zones.values():

        zones.append({
            "id": zone.id,
            "name": zone.name,
            "type": zone.zone_type.value,

            "x": zone.x,
            "y": zone.y,

            "neighbors": city.get_neighbors(zone.id),

            "population": zone.population,
            "employment": zone.employment,
            "land_value": round(zone.land_value, 2),
            "pollution": round(zone.pollution, 2),
            "traffic": round(zone.traffic, 2),
            "happiness": round(zone.happiness, 2),
        })

    return {
        "city": {
        "rows": city.rows,
        "cols": city.cols,
        "total_zones": city.total_zones(),
        },
        "zones": zones,
    }