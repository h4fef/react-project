package com.react.practice_manager.service;

import com.react.practice_manager.dto.AddressResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;

@Service
public class AddressService {

    private final RestClient restClient;

    public AddressService() {
        this.restClient = RestClient.builder()
                .baseUrl("https://nominatim.openstreetmap.org")
                .defaultHeader("User-Agent", "practice-manager-backend")
                .build();
    }

    public List<AddressResponse> searchAddresses(String search) {

        if (search == null || search.trim().length() < 3) {
            return List.of();
        }

        List<Map<String, Object>> response = restClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/search")
                        .queryParam("q", search)
                        .queryParam("format", "jsonv2")
                        .queryParam("addressdetails", 1)
                        .queryParam("limit", 5)
                        .queryParam("countrycodes", "it")
                        .queryParam("accept-language", "it")
                        .build()
                )
                .retrieve()
                .body(List.class);

        if (response == null) {
            return List.of();
        }

        return response.stream()
                .map(this::mapToAddressResponse)
                .toList();
    }

    private AddressResponse mapToAddressResponse(Map<String, Object> item) {

        Map<String, Object> address = (Map<String, Object>) item.get("address");

        String label = getString(item, "display_name");
        String street = buildStreet(address);
        String city = getCity(address);
        String province = getProvince(address);
        String postalCode = getString(address, "postcode");

        return new AddressResponse(
                label,
                street,
                city,
                province,
                postalCode
        );
    }

    private String buildStreet(Map<String, Object> address) {
        if (address == null) {
            return null;
        }

        String road = getString(address, "road");
        String houseNumber = getString(address, "house_number");

        if (road == null) {
            return null;
        }

        if (houseNumber == null) {
            return road;
        }

        return road + " " + houseNumber;
    }

    private String getCity(Map<String, Object> address) {
        if (address == null) {
            return null;
        }

        String city = getString(address, "city");

        if (city != null) {
            return city;
        }

        String town = getString(address, "town");

        if (town != null) {
            return town;
        }

        String village = getString(address, "village");

        if (village != null) {
            return village;
        }

        return getString(address, "municipality");
    }

    private String getProvince(Map<String, Object> address) {
        if (address == null) {
            return null;
        }

        return getString(address, "county");
    }

    private String getString(Map<String, Object> map, String key) {
        if (map == null || map.get(key) == null) {
            return null;
        }

        return String.valueOf(map.get(key));
    }
}