module Api
  class UsersController < ApiController
    wrap_parameters :user, include: [:username, :password, :email]
    
    def create
      @user = User.new(user_params)
      if User.find_by_username(params[:user][:username])
        render json: { error: "username taken" }, status: 422
      elsif user_params[:password] == ""
        render json: { error: "password can't be blank" }, status: 422
      elsif user_params[:username] == ""
        render json: { error: "username can't be blank" }, status: 422
      else
        @user.reset_token!
      
        if @user.save
          sign_in(@user)
        
          #subscribe user to default subs
        
          Default.all.each { |default| SubMembership.create({ user_id: @user.id, sub_id: default.sub.id }) }
        
          render json: @user
        end
      end
    end
    
    def destroy
      
    end
    
    def show
      @user = User.find_by_username(params[:username])
      
      points = 0
      
      @user.posts.each { |post| post.votes.each { |vote| points += vote.upordown } }
      @user.comments.each { |comment| comment.votes.each { |vote| points += vote.upordown } }
      
      @user.update({ points: points })
      
      render json: @user
    end
    
    def show_current
      if signed_in?
        points = 0
      
        current_user.posts.each { |post| post.votes.each { |vote| points += vote.upordown } }
        current_user.comments.each { |comment| comment.votes.each { |vote| points += vote.upordown } }
      
        current_user.update({ points: points })
      
        render json: current_user
      else
        render text: "session not found", status: 422
      end
    end
    
    def get_session
      if signed_in?
        render json: current_user, only: [:username, :points, :email]
      else
        render text: "session not found", status: 422
      end
    end
    
    def current
      render json: current_user
    end
    
    def update
      current_user.update(params[:user].permit(:email))
      render json: current_user
    end
    
    private
    
    def user_params
      params.require(:user).permit(:username, :password, :email)
    end
  end
end