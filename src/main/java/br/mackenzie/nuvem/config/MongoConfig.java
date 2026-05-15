package br.mackenzie.nuvem.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;

@Configuration
public class MongoConfig {

    @Bean
    public MongoClient mongoClient(
            @Value("${spring.data.mongodb.uri}") String uri) {
        return MongoClients.create(uri);
    }
}