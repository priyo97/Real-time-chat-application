module Api
	module V1

		class ConversationsController < ApplicationController

			def index

				conv1 = Conversation.where(sender_id: params[:id1],recipient_id: params[:id2]).first
				conv2 = Conversation.where(sender_id: params[:id2],recipient_id: params[:id1]).first

				if conv1 != nil and conv2 == nil

					render json: {status: "success", data: conv1[:id] }, status: :ok

				elsif conv1 == nil and conv2 != nil

					render json: {status: "success", data: conv2[:id] }, status: :ok

				else

					conv = Conversation.create(sender_id: params[:id1],recipient_id: params[:id2])

					render json: {status: "success", data: conv[:id]}, status: :ok
				end

			end


			# # def show

			# # 	message = Message.find(params[:id])
			# # 	render json: {status: "success", data: message}, status: :ok

			# # end


			# # def create

			# # 	message = Message.new({body: params[:body]})

			# # 	if message.save

			# # 		render json: {status: "success"}, status: :ok

			# # 	else

			# # 		render json: {status: "error"}, status: :ok

			# # 	end
			# # end


			# private

			# def message_params

			# end
		end
	end
end