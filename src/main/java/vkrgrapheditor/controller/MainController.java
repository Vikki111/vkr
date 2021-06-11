package vkrgrapheditor.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class MainController {
    private final Logger log = LoggerFactory.getLogger(MainController.class);

    @RequestMapping(value = { "/", "/index2" }, method = RequestMethod.GET)
    public String index2() {
        return "html/index2";
    }

    @RequestMapping(value = { "/index" }, method = RequestMethod.GET)
    public String index() {
        return "html/index";
    }
}