class User < ActiveRecord::Base
  attr_reader :password
  
  validates :username, presence: true, uniqueness: true
  validates :password_digest, presence: { message: "Password Can't Be Blank" }
  validates :password, length: { minimum: 6, allow_nil: true }
  
  has_many :posts
  has_many :comments
  has_many :votes
  has_many :sub_memberships
  has_many :subs, through: :sub_memberships
  has_many :owned_subs, class_name: "Sub", foreign_key: :owner_id
  
  after_initialize :ensure_session_token
  
  def self.find_by_credentials(username, password)
    @user = User.find_by_username(username)
    
    if @user
      if is_password?(password)
        @user
      else
        nil
      end
    else
      nil
    end
  end
  
  def reset_token!
    self.token = SecureRandom.urlsafe_base64
    self.save!
    self.token
  end
  
  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end
  
  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end
  
  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end
end
