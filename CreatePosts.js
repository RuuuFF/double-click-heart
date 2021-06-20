const POSTS = [
  "https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=376&q=80",
  "https://images.unsplash.com/photo-1545249390-6bdfa286032f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=297&q=80",
  "https://images.unsplash.com/photo-1500259571355-332da5cb07aa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
  "https://images.unsplash.com/photo-1506891536236-3e07892564b7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
  "https://images.unsplash.com/photo-1548366086-7f1b76106622?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=324&q=80"
]

const CreatePosts = {
  main: document.querySelector('#main'),

  createPost(image) {
    const post = `
      <article>
        <div class="post" style="background-image: url(${image})"></div>
        <section>
          <ul class="interactions">
            <li>
              <a href="#" title="Like">
                <i class="far fa-heart"></i>
                <i class="fas fa-heart"></i>
              </a>
            </li>
            <li>
              <a href="#" title="Comment">
                <i class="far fa-comment"></i>
              </a>
            </li>
            <li>
              <a href="#" title="Share">
                <i class="fas fa-share"></i>
              </a>
            </li>
          </ul>
          <small>You like it <span class="likes-counter">0</span> times</small>
        </section>
      </article>
    `
    CreatePosts.main.insertAdjacentHTML("beforeend", post)
  }
}

POSTS.forEach(image => CreatePosts.createPost(image))
