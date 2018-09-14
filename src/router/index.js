import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/homecomponents/Home'
import CompanyProfile from '@/homecomponents/CompanyProfile'
import Security from '@/homecomponents/Security'
import InviteFriends from '@/homecomponents/InviteFriends'
import WinningDetails from '@/homecomponents/WinningDetails'
import HelpFeedback from '@/homecomponents/HelpFeedback'
import HelpDetail from '@/homecomponents/HelpDetail'
import MessageCenter from '@/homecomponents/MessageCenter'
import MessageCenterTwo from '@/homecomponents/MessageCenterTwo'


import Financial from '@/financialcomponents/Financial'
import SoldOut from '@/financialcomponents/SoldOut'
import InvestDetail from '@/financialcomponents/InvestDetail'
import InvestmentRecord from '@/financialcomponents/InvestmentRecord'
import Purchase from '@/financialcomponents/Purchase'
import DetailRiskAssessment from '@/financialcomponents/RiskAssessment'
import SafeguardMeasures from '@/financialcomponents/SafeguardMeasures'


import MyWealth from '@/mywealthcomponents/MyWealth'
import Bank from '@/mywealthcomponents/Bank'
import AccountSecurity from '@/mywealthcomponents/AccountSecurity'
import AmendPassword from '@/mywealthcomponents/AmendPassword'
import AmendMobile from '@/mywealthcomponents/AmendMobile'
import Coupons from '@/mywealthcomponents/Coupons'
import Ondemand from '@/mywealthcomponents/Ondemand'
import Fixed from '@/mywealthcomponents/Fixed'
import FixDetail from '@/mywealthcomponents/FixDetail'
import FixedInvestmentRecord from '@/mywealthcomponents/FixedInvestmentRecord'
import Withdrawal from '@/mywealthcomponents/Withdrawal'
import WithdrawalSuccessful from '@/mywealthcomponents/WithdrawalSuccessful'
import CouponsHistory from '@/mywealthcomponents/CouponsHistory'
import UseInstructions from '@/mywealthcomponents/UseInstructions'


import Found from '@/foundcomponents/Found'
import ActivityCenter from '@/foundcomponents/ActivityCenter'
import BankLimit from '@/foundcomponents/BankLimit'
import InvestmentCounter from '@/foundcomponents/InvestmentCounter'
import AssetsInstructions from '@/foundcomponents/AssetsInstructions'
import RealizeHuicai from '@/foundcomponents/RealizeHuicai'
import RiskAssessment from '@/foundcomponents/RiskAssessment'


import Login from '@/registerlogincomponents/Login'
import Register from '@/registerlogincomponents/Register'
import ForgetPassword from '@/registerlogincomponents/ForgetPassword'
import FindPassword from '@/registerlogincomponents/FindPassword'
import ChangePassword from '@/registerlogincomponents/ChangePassword'



import AddBank from '@/views/AddBank'
import RiskWarning from '@/views/RiskWarning'
import Agreement from '@/views/agreement'
import AgreementSignature from '@/views/AgreementSignature'
import Recharge from '@/views/Recharge'
import ReapalSuccessful from '@/views/ReapalSuccessful'
import Buyingresults from '@/views/BuyingResults'
import RongAgreement from '@/views/RongAgreement'
import FinancialAgreement from '@/views/FinancialAgreement'
import DealPassword from '@/views/DealPassword'
import ElectronicSignature from '@/views/ElectronicSignature'
import Inspection from '@/views/Inspection'
import MeasurementResults from '@/views/MeasurementResults'


import BindCard from '@/depository/account/BindCard'
import RiskInfo from '@/depository/account/RiskInfo'
import UserProtocol from '@/depository/account/UserProtocol'
import ServiceProtocol from '@/depository/account/ServiceProtocol'
import DealPasswords from '@/depository/account/DealPasswords'
import DepRecharge from '@/depository/account/DepRecharge'
import RechargeSucceed from '@/depository/account/RechargeSucceed'
import BuySucceed from '@/depository/account/BuySucceed'
import WithdrawalSucceed from '@/depository/account/WithdrawalSucceed'
import DepWithdrawal from '@/depository/account/DepWithdrawal'
import InvestmentDetails from '@/depository/account/InvestmentDetails'


import BidBuy from '@/depository/bidBuy/BidBuy'
import RiskReveal from '@/views/RiskReveal'


import DepInvestmentRecord from '@/depository/financingProject/DepInvestmentRecord'
import DepInvestDetail from '@/depository/financingProject/DepInvestDetail'
import DepDepositsDetails from '@/depository/financingProject/DepDepositsDetails'


import BankLimitDepository from '@/depository/my_finacing/BankLimitDepository'
import Investment from '@/depository/my_finacing/Investment'
import Repay from '@/depository/my_finacing/Repay'
import ChangeDepositsPassword from '@/depository/my_finacing/ChangeDepositsPassword'
import ModifyDepositsPassword from '@/depository/my_finacing/ModifyDepositsPassword'


Vue.use(Router)

export default new Router({                                                                                                     
	routes: [
		{
			path: '/',
			component: Home
		},
		{
			path: '/home',
			name: 'Home',
			component: Home
		},
		{
			path: '/financial',
			name: 'Financial',
			component: Financial
		},
		{
			path: '/soldout',
			name: 'SoldOut',
			component: SoldOut
		},
		{
			path: '/mywealth',
			name: 'MyWealth',
			component: MyWealth
		},
		{
			path: '/found',
			name: 'Found',
			component: Found
		},
		{
			path: '/companyprofile',
			name: 'CompanyProfile',
			component: CompanyProfile
		},
		{
			path: '/security',
			name: 'Security',
			component: Security
		},
		{
			path: '/invitefriends',
			name: 'InviteFriends',
			component: InviteFriends
		},
		{
			path: '/helpfeedback',
			name: 'HelpFeedback',
			component: HelpFeedback
		},
		{
			path: '/helpdetail',
			name: 'HelpDetail',
			component: HelpDetail
		},
		{
			path: '/investdetail/:userId',
			name: 'InvestDetail',
			component: InvestDetail
		},
		{
			path: '/investmentrecord',
			name: 'InvestmentRecord',
			component: InvestmentRecord
		},
		{
			path: '/login',
			name: 'Login',
			component: Login
		},
		{
			path: '/register',
			name: 'Register',
			component: Register
		},
		{
			path: '/purchase/:userId',
			name: 'Purchase',
			component: Purchase
		},
		{
			path: '/riskwarn',
			name: 'RiskWarning',
			component: RiskWarning
		},
		{
			path: '/agreement',
			name: 'Agreement',
			component: Agreement
		},
		{
			path: '/agreementsignature',
			name: 'AgreementSignature',
			component: AgreementSignature
		},
		{
			path: '/messagecenter',
			name: 'MessageCenter',
			component: MessageCenter
		},
		{
			path: '/messagecentertwo',
			name: 'MessageCenterTwo',
			component: MessageCenterTwo
		},
		{
			path: '/bank',
			name: 'Bank',
			component: Bank
		},
		{
			path: '/dealpassword',
			name: 'DealPassword',
			component: DealPassword
		},
		{
			path: '/addbank/:buyAmount/:userId',
			name: 'AddBank',
			component: AddBank
		},
		{
			path: '/accountsecurity',
			name: 'AccountSecurity',
			component: AccountSecurity
		},
		{
			path: '/amendpassword',
			name: 'AmendPassword',
			component: AmendPassword
		},
		{
			path: '/amendmobile',
			name: 'AmendMobile',
			component: AmendMobile
		},
		{
			path: '/riskreveal',
			name: 'RiskReveal',
			component: RiskReveal
		},
		{
			path: '/coupons',
			name: 'Coupons',
			component: Coupons
		},
		{
			path: '/forgetpassword',
			name: 'ForgetPassword',
			component: ForgetPassword
		},
		{
			path: '/findpassword',
			name: 'FindPassword',
			component: FindPassword
		},
		{
			path: '/recharge',
			name: 'Recharge',
			component: Recharge
		},
		{
			path: '/activitycenter',
			name: 'ActivityCenter',
			component: ActivityCenter
		},
		{
			path: '/ondemand',
			name: 'Ondemand',
			component: Ondemand
		},
		{
			path: '/fixed',
			name: 'Fixed',
			component: Fixed
		},
		{
			path: '/banklimit',
			name: 'BankLimit',
			component: BankLimit
		},
		{
			path: '/assetsinstructions',
			name: 'AssetsInstructions',
			component: AssetsInstructions
		},
		{
			path: '/realizehuicai',
			name: 'RealizeHuicai',
			component: RealizeHuicai
		},
		{
			path: '/investmentcounter',
			name: 'InvestmentCounter',
			component: InvestmentCounter
		},
		{
			path: '/fixedinvestmentrecord',
			name: 'FixedInvestmentRecord',
			component: FixedInvestmentRecord
		},
		{
			path: '/withdrawal',
			name: 'Withdrawal',
			component: Withdrawal
		},
		{
			path: '/withdrawalsuccessful',
			name: 'WithdrawalSuccessful',
			component: WithdrawalSuccessful
		},
		{
			path: '/changepassword',
			name: 'ChangePassword',
			component: ChangePassword
		},
		{
			path: '/couponshistory',
			name: 'CouponsHistory',
			component: CouponsHistory
		},
		{
			path: '/cseinstructions',
			name: 'UseInstructions',
			component: UseInstructions
		},
		{
			path: '/reapalsuccessful',
			name: 'ReapalSuccessful',
			component: ReapalSuccessful
		},
		{
			path: '/buyingresults',
			name: 'Buyingresults',
			component: Buyingresults
		},
		{
			path: '/winningdetails',
			name: 'WinningDetails',
			component: WinningDetails
		},
		{
			path: '/fixdetail',
			name: 'FixDetail',
			component: FixDetail
		},
		{
			path: '/riskassessment',
			name: 'RiskAssessment',
			component: RiskAssessment
		},
		{
			path: '/financialagreement',
			name: 'FinancialAgreement',
			component: FinancialAgreement
		},
		{
			path: '/rongagreement',
			name: 'RongAgreement',
			component: RongAgreement
		},
		{
			path: '/banklimitdepository',
			name: 'BankLimitDepository',
			component: BankLimitDepository
		},
		{
			path: '/bindcard',
			name: 'BindCard',
			component: BindCard
		},
		{	path: '/investment',
			name: 'Investment',
			component: Investment
		},
		{
			path: '/repay',
			name: 'Repay',
			component: Repay
		},
		{
			path: '/changedepositspassword',
			name: 'ChangeDepositsPassword',
			component: ChangeDepositsPassword
		},
		{
			path: '/modifydepositspassword',
			name: 'ModifyDepositsPassword',
			component: ModifyDepositsPassword
		},
		{
			path: '/dealpasswords',
			name: 'DealPasswords',
			component: DealPasswords
		},
		{
			path: '/riskinfo',
			name: 'RiskInfo',
			component: RiskInfo
		},
		{
			path: '/userproocol',
			name: 'UserProtocol',
			component: UserProtocol
		},
		{
			path: '/serviceprotocol',
			name: 'ServiceProtocol',
			component: ServiceProtocol
		},
		{
			path: '/depinvestmentrecord',
			name: 'DepInvestmentRecord',
			component: DepInvestmentRecord
		},
		{
			path: '/depinvestdetail/:userId',
			name: 'DepInvestDetail',
			component: DepInvestDetail
		},
		{
			path: '/depdepositsdetails',
			name: 'DepDepositsDetails',
			component: DepDepositsDetails
		},
		{
			path: '/deprecharge',
			name: 'DepRecharge',
			component: DepRecharge
		},
		{
			path: '/rechargesucceed',
			name: 'RechargeSucceed',
			component: RechargeSucceed
		},
		{
			path: '/buysucceed',
			name: 'BuySucceed',
			component: BuySucceed
		},
		{
			path: '/withdrawalsucceed',
			name: 'WithdrawalSucceed',
			component: WithdrawalSucceed
		},
		{
			path: '/depwithdrawal',
			name: 'DepWithdrawal',
			component: DepWithdrawal
		},
		{
			path: '/investmentdetails',
			name: 'InvestmentDetails',
			component: InvestmentDetails
		},
		{
			path: '/electronicsignature',
			name: 'ElectronicSignature',
			component: ElectronicSignature
		},
		{
			path: '/inspection',
			name: 'Inspection',
			component: Inspection
		},
		{
			path: '/measurementResults',
			name: 'MeasurementResults',
			component: MeasurementResults
		},
		{
			path: '/detailriskassessment',
			name: 'DetailRiskAssessment',
			component: DetailRiskAssessment
		},
		{
			path: '/safeguardmeasures',
			name: 'SafeguardMeasures',
			component: SafeguardMeasures
		},
		{
			path: '/bidbuy/:userId',
			name: 'BidBuy',
			component: BidBuy
		}
	]
})
