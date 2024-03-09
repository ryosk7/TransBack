class UserCouponsController < ApplicationController
  before_action :set_user_coupon, only: %i[ show update destroy ]

  # GET /user_coupons
  # GET /user_coupons.json
  def index
    @user_coupons = UserCoupon.all
  end

  # GET /user_coupons/1
  # GET /user_coupons/1.json
  def show
  end

  # POST /user_coupons
  # POST /user_coupons.json
  def create
    @user_coupon = UserCoupon.new(user_coupon_params)

    if @user_coupon.save
      render :show, status: :created, location: @user_coupon
    else
      render json: @user_coupon.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /user_coupons/1
  # PATCH/PUT /user_coupons/1.json
  def update
    if @user_coupon.update(user_coupon_params)
      render :show, status: :ok, location: @user_coupon
    else
      render json: @user_coupon.errors, status: :unprocessable_entity
    end
  end

  # DELETE /user_coupons/1
  # DELETE /user_coupons/1.json
  def destroy
    @user_coupon.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user_coupon
      @user_coupon = UserCoupon.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_coupon_params
      params.require(:user_coupon).permit(:user_id, :coupon_id)
    end
end
