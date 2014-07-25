module Api
  class PostsController < ApiController
    wrap_parameters :post, include: [:title, :url, :body, :user_id, :sub]
    
    def create
      @post = Post.new(post_params)
      @post.sub_id = Sub.find_by_name(params[:post][:sub]).id
      
      if !@post.sub_id
        flash[:errors] = "that sub doesn't exist"
        render json: flash[:errors]
      elsif @post.save
        render json: @post
      else
        flash[:errors] = @post.errors.full_messages
        render json: @post.errors.full_messages
      end
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
          sub.posts.each do |post|
            @posts << post
          end
        end
        
        render :front_page
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
      @current_user = current_user
      
      # render json: @post
      render :post_show
    end
    
    private
    
    def post_params
      params.require(:post).permit(:title, :url, :body, :user_id) #no user_id
    end
  end
end