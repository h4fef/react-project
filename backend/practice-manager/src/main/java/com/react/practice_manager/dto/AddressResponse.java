package com.react.practice_manager.dto;

public class AddressResponse {

    private String label;
    private String street;
    private String city;
    private String province;
    private String postalCode;

    public AddressResponse() {
    }

    public AddressResponse(
            String label,
            String street,
            String city,
            String province,
            String postalCode
    ) {
        this.label = label;
        this.street = street;
        this.city = city;
        this.province = province;
        this.postalCode = postalCode;
    }

    public String getLabel() {
        return label;
    }

    public String getStreet() {
        return street;
    }

    public String getCity() {
        return city;
    }

    public String getProvince() {
        return province;
    }

    public String getPostalCode() {
        return postalCode;
    }
}