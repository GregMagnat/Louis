import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deletePost as deletePostService, fetchAllPosts } from "../../services/postService";

function PostsList() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadPosts() {
            try {
                const data = await fetchAllPosts();
                setPosts(data);
                setLoading(false);
            } catch (e) {
                setError(e);
                setLoading(false);
            }  
        }
        loadPosts();
    }, []);

    const deletePost = async (id) => {
        try {
            await deletePostService(id);
            setPosts(posts.filter((post) => post.id !== id));
        } catch (e) {
            console.log("Failed to delete the post:", e);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            {posts.map((post) => (
                <div key={post.id} className="post-container">
                    <h2>
                        <Link to={`/posts/${post.id}`} className="post-title">
                            {post.title}
                        </Link>
                    </h2>
                    <div className="post-links">
                        <Link to={`/posts/${post.id}/edit`}>Edit</Link>
                        {" | "}
                        <button onClick={() => deletePost(post.id)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default PostsList;
