module Api
  class CommentsController < ApiController
    wrap_parameters :comment, include: [:body, :commentable_id, :commentable_type, :user, :indents, :upvotes, :downvotes]
    
    def create
      @comment = Comment.new(comment_params)
      @comment.user_id = current_user.id
      
      if @comment.save
        @comment.update({ created_at: @comment.created_at.localtime })
        render json: @comment
      else
        flash[:errors] = @comment.errors.full_messages
        render json: @comment
      end
    end
    
    def destroy
      @comment = Comment.find(params[:id])
      
      if @comment.user_id == current_user.id
        @comment.destroy
        render json: @comment
      else
        render text: "not authorized"
      end
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
      params.require(:comment).permit(:body, :commentable_type, :commentable_id, :indents, :upvotes, :downvotes)
    end
  end
end