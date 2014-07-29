module Api
  class PostsController < ApiController
    wrap_parameters :post, include: [:title, :url, :body, :sub, :user, :upvotes, :downvotes]
    
    def create
      @post = Post.new(post_params)
      @post.sub_id = Sub.find_by_name(params[:post][:sub]).id
      @post.user_id = User.find_by_username(params[:post][:user]).id
      
      if !@post.sub_id
        render json: @post.errors.full_messages
      elsif @post.save
        render json: @post.errors.full_messages
      else
        flash[:errors] = @post.errors.full_messages
        render json: @post.errors.full_messages
      end
    end
    
    def update
      @post = Post.find(params[:id])
      @post.update(post_params)

      render json: @post
    end
    
    def destroy
      
    end
    
    def sub_page
      @posts = Sub.find_by_name(params[:name]).posts
      @sub = Sub.find_by_name(params[:name])
      
      if signed_in? 
        @submembership = SubMembership.where(["sub_id = ? AND user_id = ?", @sub.id, current_user.id])
      else
        @submembership = nil
      end
      
      render :sub_page
    end
    
    def front_page
      if signed_in?
        #give user their subscribed posts
        @posts = []
        
        current_user.subs.each do |sub|
          sub.posts.each do |post|
            @posts << post
            break if @posts.length == 500
          end
          break if @posts.length == 500
        end
        
        #@posts = @posts.sort_by{ |p| p.upvotes - p.downvotes }
        
        render :front_page
      else
        #give user all posts from default subs (all posts as of now)
        #old method of generating default subs - @subs = Sub.all.where("owner_id = '1'")
        @posts = []
        
        Default.all.each do |default|
          default.sub.posts.each do |post|
            @posts << post
            break if @posts.length == 500
          end
          break if @posts.length == 500
        end
        
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
      params.require(:post).permit(:title, :url, :body, :upvotes, :downvotes) #no user_id
    end
  end
end