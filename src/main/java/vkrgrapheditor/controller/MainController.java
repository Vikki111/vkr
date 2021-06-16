package vkrgrapheditor.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class MainController {
    private final Logger log = LoggerFactory.getLogger(MainController.class);

//    @RequestMapping(value = { "/", "/index2" }, method = RequestMethod.GET)
//    public String index2() {
//        return "html/index2";
//    }
//
//    @RequestMapping(value = { "/savejson" }, method = RequestMethod.POST)
//    public String savejson(@RequestBody String json) {
//        return json;
//    }
//
//    @RequestMapping(value = { "/index" }, method = RequestMethod.GET)
//    public String index() {
//        return "html/index";
//    }
}