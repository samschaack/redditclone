module Api
  class SubMembershipsController < ApiController 
    def create
      sub_id = Sub.find_by_name(params[:sub]).id
      @submembership = SubMembership.new({ user_id: current_user.id, sub_id: sub_id })
      @submembership.save!
      render json: @submembership
    end
    
    def destroy
      @submembership = SubMembership.find_by_user_id_and_sub_id(current_user.id, Sub.find_by_name(params[:sub]).id)
      @submembership.destroy
      render json: @submembership
    end
  end
end