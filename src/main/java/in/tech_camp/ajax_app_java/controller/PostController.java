package in.tech_camp.ajax_app_java.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import in.tech_camp.ajax_app_java.entity.PostEntity;
import in.tech_camp.ajax_app_java.form.PostForm;
import in.tech_camp.ajax_app_java.repository.PostRepository;
import lombok.AllArgsConstructor;

@Controller
@AllArgsConstructor
public class PostController {

  @Autowired
  private final PostRepository postRepository;

  @GetMapping("/")
  public String showList(Model model) {
    var postList = postRepository.findAll();
    model.addAttribute("postList", postList);
    model.addAttribute("postForm", new PostForm());
    return "posts/index";
  }

  // ResponseEntityクラスを使ってPostEntityをレスポンスとして返す
  @PostMapping("/posts")
  public ResponseEntity<PostEntity> savePost(@ModelAttribute("postForm") PostForm form){
    PostEntity post = new PostEntity();
    post.setContent(form.getContent());
    postRepository.insert(post);
    PostEntity resultPost = postRepository.findById(post.getId());
    return ResponseEntity.ok(resultPost);
  }
  
}
