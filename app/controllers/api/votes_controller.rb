module Api
  class VotesController < ApiController
    wrap_parameters :vote, include: [:voteable_type, :voteable_id, :upordown]
    
    def create
      upordownopp = "1"
    
      if params[:vote][:upordown] == "1"
        upordownopp = "-1"
      end
      
      if Vote.find_by_user_id_and_voteable_type_and_voteable_id_and_upordown(current_user.id, params[:vote][:voteable_type], params[:vote][:voteable_id], params[:vote][:upordown]) == nil && Vote.find_by_user_id_and_voteable_type_and_voteable_id_and_upordown(current_user.id, params[:vote][:voteable_type], params[:vote][:voteable_id], upordownopp) == nil
        #new vote => save
        @vote = Vote.new({ user_id: current_user.id, voteable_type: params[:vote][:voteable_type], voteable_id: params[:vote][:voteable_id], upordown: params[:vote][:upordown] })
        @vote.save
        render text: "1", status: 200
      elsif Vote.find_by_user_id_and_voteable_type_and_voteable_id_and_upordown(current_user.id, params[:vote][:voteable_type], params[:vote][:voteable_id], upordownopp) != nil
        #reverse vote => destroy old one, create new one
        Vote.find_by_user_id_and_voteable_type_and_voteable_id_and_upordown(current_user.id, params[:vote][:voteable_type], params[:vote][:voteable_id], upordownopp).destroy
        @vote = Vote.new({ user_id: current_user.id, voteable_type: params[:vote][:voteable_type], voteable_id: params[:vote][:voteable_id], upordown: params[:vote][:upordown] })
        @vote.save
        render text: "2", status: 200
      elsif Vote.find_by_user_id_and_voteable_type_and_voteable_id_and_upordown(current_user.id, params[:vote][:voteable_type], params[:vote][:voteable_id], params[:vote][:upordown]) != nil
        #undo vote => destroy old one
        Vote.find_by_user_id_and_voteable_type_and_voteable_id_and_upordown(current_user.id, params[:vote][:voteable_type], params[:vote][:voteable_id], params[:vote][:upordown]).destroy
        render text: "3", status: 200
      end
    end
  end
end