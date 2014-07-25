module Api
  class CommentsController < ApiController
    wrap_parameters :comment, include: [:body, :commentable_id, :commentable_type, :user_id, :indents]
    
    def create
      # @post = Post.new(post_params)
      # @post.sub_id = Sub.find_by_name(params[:post][:sub]).id
      #
      # if !@post.sub_id
      #   flash[:errors] = "that sub doesn't exist"
      #   render json: flash[:errors]
      # elsif @post.save
      #   render json: @post
      # else
      #   flash[:errors] = @post.errors.full_messages
      #   render json: @post.errors.full_messages
      # end
    end
    
    def destroy
      
    end
    
    def index
      if params[:post_id]
        @comments = Comment.where(["commentable_type = ? AND commentable_id = ?", "Post", params[:post_id]])
        render :comment_index
      else
        @comments = Comment.where(["commentable_type = ? AND commentable_id = ?", "Comment", params[:comment_id]])
        render :comment_index
      end
    end
    
    def show
      # @comment = Comment.find(params[:id])
      # @user = @comment.user
      #
      # # render json: @post
      # render :comment_show
    end
    
    private
    
    def comment_params
      params.require(:comment).permit(:body)
    end
  end
end