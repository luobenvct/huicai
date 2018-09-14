//用户登录
export const updateUserInfo = (state, newUserInfo) => {
  state.userInfo = newUserInfo
}

//购买金额
export const buyAmount = (state, buyAmount) => {
  state.buyAmount = buyAmount
}

export const testFun = (state)=>{
	state.rootBase = 'kkk'
}