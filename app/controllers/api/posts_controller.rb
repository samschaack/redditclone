module Api
  class PostsController < ApiController
    def create
      
    end
    
    def destroy
      
    end
    
    def sub_page
      # grab sub from params, return user's posts filtered by sub
    end
    
    def front_page
      if signed_in?
        #give user their subscribed posts
        @posts = []
        
        current_user.subs.each do |sub|
          @posts << sub.posts
        end
        
        render json: @posts
      else
        #give user all posts from default subs (all posts as of now)
        @posts = Post.where("sub_id = '1'")
        #render json: @posts
        render :front_page
      end
    end
    
    def show
      @post = Post.find(params[:id])
      render json: @post
    end
    
    private
    
    def board_params
      params.require(:post).permit(:title, :url, :body, :sub_id, :user_id)
    end
  end
end