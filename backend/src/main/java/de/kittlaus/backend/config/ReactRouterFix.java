package de.kittlaus.backend.config;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
@Controller
public class ReactRouterFix {
    @RequestMapping(value = "/**/{[path:[^\\.]*}")
    public String forwardToRouteUrl() {
        return "forward:/";
    }
}
