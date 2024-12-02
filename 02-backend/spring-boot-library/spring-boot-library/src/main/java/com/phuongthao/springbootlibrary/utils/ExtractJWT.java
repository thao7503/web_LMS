package com.phuongthao.springbootlibrary.utils;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

public class ExtractJWT {

    public static String payloadJWTExtraction(String token, String extraction) {

        // Remove the "Bearer " prefix if it exists
        token = token.replace("Bearer ", "");

        // Split the token into its three parts
        String[] chunks = token.split("\\.");
        Base64.Decoder decoder = Base64.getUrlDecoder();

        // Decode the payload (second part of the JWT)
        String payload = new String(decoder.decode(chunks[1]));

        // Split the payload into individual key-value pairs
        String[] entries = payload.split(",");
        Map<String, String> map = new HashMap<>();

        // Loop through the entries to extract the desired value
        for (String entry : entries) {
            String[] keyValue = entry.split(":");

            // Check if the key matches the extraction parameter
            if (keyValue[0].equals(extraction)) {

                int remove = 1;
                // Check for a trailing "}" and adjust accordingly
                if (keyValue[1].endsWith("}")) {
                    remove = 2;
                }
                // Clean up the value (remove any surrounding quotes or brackets)
                keyValue[1] = keyValue[1].substring(0, keyValue[1].length() - remove);
                keyValue[1] = keyValue[1].substring(1);

                // Add the key-value pair to the map
                map.put(keyValue[0], keyValue[1]);
            }
        }

        // Return the extracted value if present
        if (map.containsKey(extraction)) {
            return map.get(extraction);
        }

        return null;
    }
}
