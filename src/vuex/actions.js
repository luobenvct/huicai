// 用户操作数据触发方式
export const setStory = ({ commit, state }, payload) => {
  commit('setStory', payload)
}

// 改变nav
export const setNav = ({ commit, state }, payload) => {
  commit('setNav', payload)
}

export const updateUserInfo = ({ commit, state }, payload) => {
  commit('updateUserInfo', payload)
}

export const buyAmount = ({ commit, state }, payload) => {
  commit('buyAmount', payload)
}

export const test = ({commit,state},payload)=>{
	dispatch('testFun')
}

// const actions = {
// 	test({commit},payload){
// 		dispatch('testFun')
// 	}
// }