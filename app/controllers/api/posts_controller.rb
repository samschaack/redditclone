module Api
  class PostsController < ApiController
    wrap_parameters :post, include: [:title, :url, :body, :sub, :user, :upvotes, :downvotes]
    
    def create
      @post = Post.new(post_params)
      @post.sub_id = Sub.find_by_name(params[:post][:sub]).id
      @post.user_id = current_user.id
      
      if !@post.sub_id
        render json: @post.errors.full_messages
      elsif @post.save
        render json: @post
      else
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
      @sub = Sub.find_by_name(params[:name])
      @posts = @sub.posts
      
      if signed_in? 
        @submembership = SubMembership.where(["sub_id = ? AND user_id = ?", @sub.id, current_user.id])
      else
        @submembership = nil
      end
      
      #filter out old posts
      @posts = @posts.select{ |p| p.created_at > Time.now - 500000 }
      
      #sort posts before sending
      @posts = @posts.sort_by{ |p| p.upvotes - p.downvotes }
      
      render :sub_page
    end
    
    def front_page
      query = 
      
      if signed_in?
        #give user their subscribed posts
        @posts = Post.select('posts.*')
        .joins(<<-SQL)
        LEFT OUTER JOIN 
          subs 
        ON 
          posts.sub_id = subs.id 
        JOIN 
          sub_memberships 
        ON 
          sub_memberships.sub_id = subs.id 
        JOIN 
          users 
        ON 
          sub_memberships.user_id = users.id
      SQL
        .where('users.id = ?', current_user.id)
        .group('posts.id').limit(20)
        
        #filter out old posts
        # .where('users.id = ?', current_user.id).where('posts.created_at > ?', Time.now - 500000)
        
        #sort posts before sending
        #@posts = @posts.sort_by{ |p| p.upvotes - p.downvotes }
        
        page = params[:page]
        
        #@posts = @posts[page * 20...page * 20 + 20]
        
        render :front_page
      else
        @posts = []
        
        Default.all.each do |default|
          default.sub.posts.each do |post|
            @posts << post
          end
        end
        
        #filter out old posts
        @posts = @posts.select{ |p| p.created_at > Time.now - 500000 }
        
        #sort posts before sending
        @posts = @posts.sort_by{ |p| p.upvotes - p.downvotes }
        
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
      params.require(:post).permit(:title, :url, :body, :upvotes, :downvotes)
    end
  end
end