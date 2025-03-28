export const clientReportData = {
    "analyticsReports": {
        "overview": {
            "totalClients": 20,
            "totalRevenue": 1870000,
            "totalCommission": 234500,
            "activeMachines": 215,
            "totalTRTs": 52,
            "regions": [
                { "name": "Western", "clients": 8, "revenue": 760000, "commission": 91200 },
                { "name": "Eastern", "clients": 4, "revenue": 490000, "commission": 58800 },
                { "name": "Southern", "clients": 5, "revenue": 410000, "commission": 49200 },
                { "name": "Midwestern", "clients": 2, "revenue": 160000, "commission": 19200 },
                { "name": "Southeast", "clients": 1, "revenue": 50000, "commission": 6500 }
            ]
        },
        "performanceMetrics": {
            "topPerformingClients": [
                {
                    "id": "ABC123",
                    "name": "Elite Gaming Lounge",
                    "revenue": 500000,
                    "commission": 60000,
                    "profitMargin": "88%"
                },
                {
                    "id": "XYZ456",
                    "name": "Power Play Arcade",
                    "revenue": 750000,
                    "commission": 112500,
                    "profitMargin": "85%"
                },
                {
                    "id": "GHI789",
                    "name": "Neon Nexus",
                    "revenue": 620000,
                    "commission": 93000,
                    "profitMargin": "85%"
                }
            ],
            "machineUtilization": [
                {
                    "clientId": "ABC123",
                    "clientName": "Elite Gaming Lounge",
                    "machines": 18,
                    "utilizationRate": "78%",
                    "avgRevenuePerMachine": 27778
                },
                {
                    "clientId": "DEF456",
                    "clientName": "Pixel Play Arena",
                    "machines": 12,
                    "utilizationRate": "65%",
                    "avgRevenuePerMachine": 37500
                },
                {
                    "clientId": "GHI789",
                    "clientName": "Neon Nexus",
                    "machines": 25,
                    "utilizationRate": "82%",
                    "avgRevenuePerMachine": 24800
                }
            ]
        },
        "financialReports": {
            "monthlyRevenue": [
                { "month": "Jan 2025", "revenue": 1500000, "commission": 180000 },
                { "month": "Feb 2025", "revenue": 1650000, "commission": 198000 },
                { "month": "Mar 2025", "revenue": 1870000, "commission": 234500 }
            ],
            "depositActivity": [
                { "date": "2025-03-25", "deposits": 3, "totalAmount": 14500 },
                { "date": "2025-03-26", "deposits": 2, "totalAmount": 10000 },
                { "date": "2025-03-27", "deposits": 4, "totalAmount": 18000 }
            ],
            "withdrawalActivity": [
                { "date": "2025-03-25", "withdrawals": 2, "totalAmount": 8000 },
                { "date": "2025-03-26", "withdrawals": 1, "totalAmount": 7000 },
                { "date": "2025-03-27", "withdrawals": 3, "totalAmount": 15000 }
            ]
        },
        "gamePerformance": {
            "topGames": [
                { "gameId": "GM-001", "name": "Fortune Spin", "plays": 120, "revenue": 6000 },
                { "gameId": "GM-002", "name": "Jackpot Mania", "plays": 98, "revenue": 4900 },
                { "gameId": "GM-003", "name": "Treasure Hunt", "plays": 85, "revenue": 4250 }
            ],
            "winLossRatios": [
                { "gameId": "GM-001", "name": "Fortune Spin", "customerWins": 45, "houseWins": 75, "ratio": "1:1.67" },
                { "gameId": "GM-002", "name": "Jackpot Mania", "customerWins": 52, "houseWins": 46, "ratio": "1.13:1" },
                { "gameId": "GM-003", "name": "Treasure Hunt", "customerWins": 38, "houseWins": 47, "ratio": "1:1.24" }
            ]
        },
        "regionalAnalysis": {
            "revenueByRegion": [
                { "region": "Western", "revenue": 760000, "percentage": "40.6%" },
                { "region": "Eastern", "revenue": 490000, "percentage": "26.2%" },
                { "region": "Southern", "revenue": 410000, "percentage": "21.9%" },
                { "region": "Midwestern", "revenue": 160000, "percentage": "8.6%" },
                { "region": "Southeast", "revenue": 50000, "percentage": "2.7%" }
            ],
            "clientDistribution": [
                { "region": "Western", "clients": 8, "percentage": "40%" },
                { "region": "Eastern", "clients": 4, "percentage": "20%" },
                { "region": "Southern", "clients": 5, "percentage": "25%" },
                { "region": "Midwestern", "clients": 2, "percentage": "10%" },
                { "region": "Southeast", "clients": 1, "percentage": "5%" }
            ]
        },
        "trends": {
            "weeklyPerformance": [
                { "week": "Week 1", "revenue": 420000, "change": "+5%" },
                { "week": "Week 2", "revenue": 450000, "change": "+7%" },
                { "week": "Week 3", "revenue": 500000, "change": "+11%" },
                { "week": "Week 4", "revenue": 500000, "change": "0%" }
            ],
            "peakHours": [
                { "hour": "12:00 PM", "activity": 78 },
                { "hour": "6:00 PM", "activity": 92 },
                { "hour": "8:00 PM", "activity": 85 },
                { "hour": "10:00 PM", "activity": 65 }
            ]
        }
    }
}