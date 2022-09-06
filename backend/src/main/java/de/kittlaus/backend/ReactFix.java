package de.kittlaus.backend;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
@Controller
public class ReactFix {
    @RequestMapping(value = "/**/{[path:[^\\.]*}")
    public String forwardToRouteUrl() {
        return "forward:/";
    }
}