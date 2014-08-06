module Api
  class VotesController < ApiController
    wrap_parameters :vote, include: [:voteable_type, :voteable_id, :upordown]
    
    def create
      type = "Post" if params[:vote][:voteable_type] == "Post"
        
      upordownopp = "1"
    
      if params[:vote][:upordown] == "1"
        upordownopp = "-1"
      end
      
      upordown = params[:vote][:upordown].to_i
      
      if Vote.find_by_user_id_and_voteable_type_and_voteable_id_and_upordown(current_user.id, params[:vote][:voteable_type], params[:vote][:voteable_id], params[:vote][:upordown]) == nil && Vote.find_by_user_id_and_voteable_type_and_voteable_id_and_upordown(current_user.id, params[:vote][:voteable_type], params[:vote][:voteable_id], upordownopp) == nil
        @vote = Vote.new({ user_id: current_user.id, voteable_type: params[:vote][:voteable_type], voteable_id: params[:vote][:voteable_id], upordown: params[:vote][:upordown] })
        @vote.save
        
        object = @vote.voteable_type.constantize.find(@vote.voteable_id)
        
        if upordown == 1
          object.update({ upvotes: object.upvotes + 1 })
        else 
          object.update({ downvotes: object.downvotes + 1 })
        end
        
        render json: { status: "1", id: @vote.id }
      elsif Vote.find_by_user_id_and_voteable_type_and_voteable_id_and_upordown(current_user.id, params[:vote][:voteable_type], params[:vote][:voteable_id], upordownopp) != nil
        Vote.find_by_user_id_and_voteable_type_and_voteable_id_and_upordown(current_user.id, params[:vote][:voteable_type], params[:vote][:voteable_id], upordownopp).destroy
        @vote = Vote.new({ user_id: current_user.id, voteable_type: params[:vote][:voteable_type], voteable_id: params[:vote][:voteable_id], upordown: params[:vote][:upordown] })
        @vote.save
        
        object = @vote.voteable_type.constantize.find(@vote.voteable_id)
        
        if upordown == 1
          object.update({ upvotes: object.upvotes + 1 })
          object.update({ downvotes: object.downvotes - 1 })
        else 
          object.update({ upvotes: object.upvotes - 1 })
          object.update({ downvotes: object.downvotes + 1 })
        end
        
        render json: { status: "2", id: @vote.id }
      elsif Vote.find_by_user_id_and_voteable_type_and_voteable_id_and_upordown(current_user.id, params[:vote][:voteable_type], params[:vote][:voteable_id], params[:vote][:upordown]) != nil
        @vote = Vote.find_by_user_id_and_voteable_type_and_voteable_id_and_upordown(current_user.id, params[:vote][:voteable_type], params[:vote][:voteable_id], params[:vote][:upordown])
        @vote.destroy
        
        object = @vote.voteable_type.constantize.find(@vote.voteable_id)
        
        if upordown == 1
          object.update({ upvotes: object.upvotes - 1 })
        else 
          object.update({ downvotes: object.downvotes - 1 })
        end
        
        render json: { status: "3", id: @vote.id }
      end
    end
    
    def getVote
      @vote = Vote.find(params[:id])
      render json: @vote
    end
    
    def front_page
      @votes = current_user.votes.where(["voteable_type = ?", "Post"])
      render json: @votes
    end
    
    def sub_page
      @votes = current_user.votes.where(["voteable_type = ?", "Post"])
      render json: @votes
    end
    
    def index
      if signed_in?
        @votes = current_user.votes
        render json: @votes
      else
        render text: "not signed in (no vote(s) to show)", status: 304
      end
    end
  end
end
