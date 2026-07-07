package com.react.practice_manager.controller;

import com.react.practice_manager.dto.AddressResponse;
import com.react.practice_manager.service.AddressService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/addresses")
@CrossOrigin(origins = "http://localhost:5173")
public class AddressController {

    private final AddressService addressService;

    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    @GetMapping("/search")
    public List<AddressResponse> searchAddresses(
            @RequestParam String search
    ) {
        return addressService.searchAddresses(search);
    }
}