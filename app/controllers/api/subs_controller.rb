module Api
  class SubsController < ApiController 
    wrap_parameters :sub, include: [:name, :description, :owner]
    
    def get_sub_info
      @sub = Sub.find_by_name(params[:name])
      
      if signed_in?
        if SubMembership.find_by_user_id_and_sub_id(current_user.id, @sub.id)
          @submember = "yes"
        else
          @submember = "no"
        end
      end
      
      render :sub_info
    end
    
    def create
      @sub = Sub.new({ name: params[:sub][:name], description: params[:sub][:description] })
      
      owner_id = current_user.id
      @sub.owner_id = current_user.id
      
      if @sub.save
        render json: @sub
      else
        render text: "sub couldn't be created"
      end
    end
    
    def index
      @subs = Sub.all
      
      render :all_sub_info
    end
    
    def subscribed
      @subs = current_user.subs
      
      render :all_sub_info
    end
    
    def unsubscribed
      @subs = Sub.all - current_user.subs
      
      render :all_sub_info
    end
    
    def owned
      @subs = current_user.owned_subs
      
      render :all_sub_info
    end
  end
end