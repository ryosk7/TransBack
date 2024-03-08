class UserWalletsController < ApplicationController
  before_action :set_user_wallet, only: %i[ show update destroy ]

  # GET /user_wallets
  # GET /user_wallets.json
  def index
    @user_wallets = UserWallet.all
  end

  # GET /user_wallets/1
  # GET /user_wallets/1.json
  def show
  end

  # POST /user_wallets
  # POST /user_wallets.json
  def create
    @user_wallet = UserWallet.new(user_wallet_params)

    if @user_wallet.save
      render :show, status: :created, location: @user_wallet
    else
      render json: @user_wallet.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /user_wallets/1
  # PATCH/PUT /user_wallets/1.json
  def update
    if @user_wallet.update(user_wallet_params)
      render :show, status: :ok, location: @user_wallet
    else
      render json: @user_wallet.errors, status: :unprocessable_entity
    end
  end

  # DELETE /user_wallets/1
  # DELETE /user_wallets/1.json
  def destroy
    @user_wallet.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user_wallet
      @user_wallet = UserWallet.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_wallet_params
      params.require(:user_wallet).permit(:address, :name, :avatar)
    end
end
