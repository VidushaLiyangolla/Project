package ceb.ebs.electricitybillingsystem.config;

import ceb.ebs.electricitybillingsystem.controller.UserController;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.servlet.ServletProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JerseyConfig extends ResourceConfig {

    public JerseyConfig() {
        property(ServletProperties.FILTER_FORWARD_ON_404, true);
        register(UserController.class);
        register(WebConfig.class);
    }

}
