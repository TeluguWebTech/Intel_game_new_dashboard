import React from 'react'
import ClientBlocks from './components/views/clientview/ClientBlocks'
import MachineBlocks from './components/views/machineview/MachineBlocks'
import { Routes, Route } from 'react-router-dom'
import RevenueBlocks from './components/views/revenueview/RevenueBlocks'
import AccountsBlock from './components/views/accountsview/AccountsBlock'
import CustomersBlock from './components/views/customerview/CustomersBlock'
import HRblocks from './components/views/hrview/HRblocks'
import EmployeesBlock from './components/views/employeeview/EmployeesBlock'
import LandingPage from './pages/LandingPage'
import NavbarComp from './components/NavbarComp'
import ClientLocations from './components/views/clientview/ClientLocations'
import ClientDetails from './components/views/clientview/ClientDetails'
import ClientSales from './components/views/clientview/ClientSales'
import { ClientSalesDetail } from './components/views/clientview/ClientSalesDetail'
import MatchDashboard from './components/views/machview/MatchDashboard'
import MatchDetails from './components/views/machineview/MatchDetails'
import AddClient from './components/views/clientview/AddClient'
import ClientCommissions from './components/views/clientview/ClientCommissions'
import CommissionDetails from './components/views/clientview/CommisionDetails'
import SingleClient from './components/views/clientview/SingleClient'
import ClientReports from './components/views/clientview/ClientReports'
import ClientDataTable from './components/views/clientview/ClientTable'
import GameMachinesView from './components/views/machineview/GameMachinesView'
import GameMachineDetails from './components/views/machineview/GameMachineDetails'
import TRTMachineView from './components/views/machineview/TRTMachineView'
import TRTDeposits from './components/views/machineview/TRTDeposits'
import { TRTWithdraws,WithdrawalDetail } from './components/views/machineview/TRTWithdraws'
import MachineReports from './components/views/machineview/MachineReports'
import TotalRevenue from './components/views/revenueview/TotalRevenue'
import RevenueTransactions from './components/views/revenueview/RevenueTransactions'
import AccountsOverview from './components/views/accountsview/AccountsOverview'
import IncomeView from './components/views/accountsview/IncomeView'
import PaymentsView from './components/views/accountsview/PaymentsView'
import AccountTransactions from './components/views/accountsview/AccountTransactions'
import AccountExpenses from './components/views/accountsview/AccountExpenses'
import AccountReport from './components/views/accountsview/AccountReports'
import AllCustomers from './components/views/customerview/AllCusotmers'
import SessionRecords from './components/views/customerview/SessionRecords'
import CustomerEngagement from './components/views/customerview/CustomerEngagement'
import CustomerTracking from './components/views/customerview/CustomerTracking'
import BlockedCustomers from './components/views/customerview/BlockedCustomers'
import FrequentCustomers from './components/views/customerview/FrequentCustomers'
import CustomerFeedback from './components/views/customerview/CustomerFeedback'
import CustomerReports from './components/views/customerview/CustomerReports'
import AllEmployees from './components/views/employeeview/AllEmployees'
import EmpAttLeaves from './components/views/hrview/EmpAttLeaves'
import Payroll from './components/views/hrview/Payroll'
import EmployeePerformance from './components/views/hrview/EmpPerformance'
import ClientContacts from './components/views/clientview/ClientContacts'
import MachineLocations from './components/views/machineview/MachineLocations'
import RevenueDashboard from './components/views/revenueview/RevenueDashboard'
import ClientLocationDetail from './components/views/ClientLocatinDetail'
import TaskDashboard from './components/views/taskview/TaskDashboard'
import MarketingDashboard from './components/views/marketingview/MarketingDashboard'
import TRTDepositDetails from './components/views/machineview/TRTDepositDetails'
import IncomeDetails from './components/views/accountsview/IncomeDetails'
import PaymentDetails from './components/views/accountsview/PaymentDetails'
import IncomeDetailRecord from './components/views/accountsview/IncomeDetailRecord'
import PaymentDetailRecord from './components/views/accountsview/PaymentDetailRecord'
import PurchaseDetailRecord from './components/views/accountsview/PurchaseDetailRecord'
import SalaryDetailRecord from './components/views/accountsview/SalaryDetailRecord'
import CustomerDetail from './components/views/customerview/CustomerDetail'
import SessionDetail from './components/views/customerview/SessionDetail'



const App = () => {
  return (
    <div>
      <NavbarComp />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/clients" element={<ClientBlocks />}/>
        <Route path="/machines" element={ <MachineBlocks />}/>
        {/* <Route path="/revenue" element={ <RevenueBlocks/>}/> */}
        <Route path="/revenue" element={ <RevenueDashboard/>}/>
        <Route path="/accounts" element={ <AccountsBlock/>}/>
        <Route path="/customers" element={ <CustomersBlock />}/>
        <Route path="/hr" element={ <HRblocks />}/>
        <Route path="/employees" element={ <EmployeesBlock />}/>
        <Route path="/tasks" element={ <TaskDashboard />}/>
        <Route path="/client-locations" element={ <ClientLocations />}/>
        <Route path="/client/:id" element={<ClientDetails />} />
        <Route path="/clients/:clientId" element={<SingleClient/>} />
        <Route path="/client-sales" element={<ClientSales />} />
        <Route path="/sales/:clientId" element={<ClientSalesDetail />} />
        <Route path="/matches" element={<MatchDashboard />} />
        <Route path="/matches/:matchId" element={<MatchDetails />} />
        <Route path="/add-client" element={<AddClient />} />
        <Route path="/client-commissions" element={<ClientCommissions />} />
        <Route path="/commission-details/:clientId" element={<CommissionDetails />} />
        <Route path="/client-reports" element={<ClientReports />} />
        <Route path="/client-data" element={<ClientDataTable/>} />
        <Route path="/game-machines" element={<GameMachinesView/>} />
        <Route path="/trt-machines" element={<TRTMachineView/>} />
        <Route path="/game-machines/:machineId" element={<GameMachineDetails />} />
        <Route path="/trt-deposits" element={<TRTDeposits />} />
        <Route path="/trt-withdrawls" element={<TRTWithdraws />} />
        <Route path="/machine-reports" element={<MachineReports />} />
        <Route path="/total-revenue" element={<TotalRevenue />} />
        <Route path="/revenue-transactions" element={<RevenueTransactions />} />
        <Route path="/accounts-overview" element={<AccountsOverview/>} />
        <Route path="/income-view" element={<IncomeView/>} />
        <Route path="/payments-view" element={<PaymentsView/>} />
        <Route path="/account-transactions" element={<AccountTransactions/>} />
        <Route path="/account-expenses" element={<AccountExpenses/>} />
        <Route path="/account-report" element={<AccountReport/>} />
        <Route path="/customer-list" element={<AllCustomers />} />
        <Route path="/session-records" element={<SessionRecords />} />
        <Route path="/customer-engagement" element={<CustomerEngagement />} />
        <Route path="/customer-tracking" element={<CustomerTracking />} />
        <Route path="/blocked-customers" element={<BlockedCustomers />} />
        <Route path="/prime-customers" element={<FrequentCustomers />} />
        <Route path="/customer-feedback" element={<CustomerFeedback />} />
        <Route path="/customer-reports" element={<CustomerReports />} />
        <Route path="/all-employees" element={<AllEmployees />} />
        <Route path="/emp-register" element={<EmpAttLeaves />} />
        <Route path="/emp-payroll" element={<Payroll />} />
        <Route path="/emp-performance" element={<EmployeePerformance />} />
        <Route path="/client-contacts" element={<ClientContacts/>} />
        <Route path="/machine-locations" element={<MachineLocations/>} />
        <Route path="/location-detail" element={<ClientLocationDetail/>} />
        <Route path="/marketing" element={<MarketingDashboard/>} />
        <Route path="/machines/trt-deposits/:receiptId" element={<TRTDepositDetails/>} />
        <Route path="/machines/withdrawals/:receiptId" element={<WithdrawalDetail />} />
        <Route path="/accounts/income/:vendorId" element={<IncomeDetails />} />
        <Route path="/accounts/payments/:vendorId" element={<PaymentDetails />} />
        <Route path="/accounts/income/:vendorId" element={<IncomeDetailRecord />} />
      <Route path="/accounts/payments/:vendorId" element={<PaymentDetailRecord />} />
      <Route path="/accounts/purchases/:vendorId" element={<PurchaseDetailRecord />} />
      <Route path="/accounts/salaries/:empId" element={<SalaryDetailRecord />} />
      <Route path="/customers/:customerId" element={<CustomerDetail />} />
      <Route path="/customers/sessions/:sessionId" element={<SessionDetail />} />
      </Routes>
     
    </div>
  )
}

export default App
