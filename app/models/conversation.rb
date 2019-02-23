class Conversation < ActiveRecord::Base

	belongs_to :sender, :foreign_key => :sender_id, class_name: :user
 	belongs_to :recipient, :foreign_key => :recipient_id, class_name: :user

 	has_many :messages, dependent: :destroy

 	validates_uniqueness_of :sender_id, :scope => :recipient_id

end
