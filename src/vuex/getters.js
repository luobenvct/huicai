

// 投资列表展示
export const getLists = state => state.lists
// 是否登录
export const getUser = state => state.userInfo.loginUser
// 获取rootURl
export const getRootUrl = state => {
	return state.rootUrl
}

// 获取rootBase
export const getRootBase = state => state.rootBase


// 获取https,测试或正式
export const getHttps = state => {
	return state.Https
}

// 获取riskJson
export const getriskJson = state => state.riskJson

export const getBuyAmount = state => state.buyAmount

