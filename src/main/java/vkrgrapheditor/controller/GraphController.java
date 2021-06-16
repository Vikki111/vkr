package vkrgrapheditor.controller;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class GraphController {

    @RequestMapping(value = { "/", "/index2" }, method = RequestMethod.GET)
    public ModelAndView index () {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("html/index2");
        return modelAndView;
    }

    @RequestMapping(value = { "/savejson" }, method = RequestMethod.POST)
    public String savejson(@RequestBody String json) {
        return json;
    }
}
