module Api
	module V1

		class MessagesController < ApplicationController

			def index

				messages = Message.where(conversation_id: params[:conv_id])

				obj = []

				messages.each do |m|

					u = User.find(m[:user_id])

					obj.push({user: u[:id], body: m[:body]})

				end

				render json: {status: "success", data: obj}, status: :ok

			end


			# def show

			# 	message = Message.find(params[:id])
			# 	render json: {status: "success", data: message}, status: :ok

			# end


			def create

				message = Message.new(conversation_id: params[:conversation], user_id: params[:user], body: params[:body])

				if message.save

					render json: {status: "success"}, status: :ok

				else

					render json: {status: "error"}, status: :ok

				end
			end


			# private

			# def message_params

			# end
		end
	end
end