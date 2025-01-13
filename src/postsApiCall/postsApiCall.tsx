import { DOMAIN } from "@/constant/constant";
interface Post{

}

export async function getPosts() {
    const response = await fetch(`${DOMAIN}/api/posts`, {
      cache: "no-store",
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error("faild to fetch posts");
    }
    return response.json();
}


export async function getSinglePost(postId:string):Promise<Post> {
 const response = await fetch(`${DOMAIN}/api/posts/${postId}`, {
   cache: "no-store",
   next: { revalidate: 60 },
 });

 if (!response.ok) {
   throw new Error("faild to fetch posts");
 }
 return response.json();
}



