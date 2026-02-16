"use client";

import { useState } from "react";
import Link from "next/link";
import { CalendarDays, Pencil, Trash2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

type Post = {
  id: number;
  title: string | null;
  created_at: string;
};

export default function PostsList({
  initialPosts,
  userId,
}: {
  initialPosts: Post[];
  userId: string;
}) {
  const supabase = createClient();
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [error, setError] = useState("");

  const handleDelete = async (postId: number) => {
    setError("");
    const confirmed = window.confirm("Delete this post?");
    if (!confirmed) return;

    const { error: deleteError } = await supabase
      .from("posts")
      .delete()
      .eq("id", postId)
      .eq("user_id", userId);

    if (deleteError) {
      setError(deleteError.message);
      return;
    }

    setPosts((prev) => prev.filter((post) => post.id !== postId));
  };

  if (posts.length === 0) {
    return (
      <Card className="border-border/70 shadow-sm">
        <CardContent className="p-6 text-sm text-muted-foreground">No posts yet. Create your first update.</CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {posts.map((post) => (
        <Card key={post.id} className="border-border/70 shadow-sm">
          <CardContent className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <CalendarDays className="h-3.5 w-3.5" />
                {new Date(post.created_at).toLocaleDateString()}
              </div>
              <h3 className="mt-2 text-base font-semibold">{post.title || "Untitled"}</h3>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                href={`/admin/posts/${post.id}/edit`}
                className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
              >
                  <Pencil className="h-4 w-4" />
                  Edit
              </Link>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(post.id)}>
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
