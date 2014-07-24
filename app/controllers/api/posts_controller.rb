module Api
  class PostsController < ApiController
    def create
      
    end
    
    def destroy
      
    end
    
    def sub_page
      @posts = Sub.find_by_name(params[:name]).posts
      @sub = Sub.find_by_name(params[:name])
      
      render :sub_page
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
      @user = @post.user
      @sub = @post.sub
      
      # render json: @post
      render :post_show
    end
    
    private
    
    def post_params
      params.require(:post).permit(:title, :url, :body, :sub_id, :user_id)
    end
  end
end