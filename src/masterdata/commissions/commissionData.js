export const commissionData = [
    {
        "commission_calculation": {
            "client_id": "C001",
            "client_name": "GameZone Inc.",
            "client_image": "https://randomuser.me/api/portraits/men/1.jpg",
            "vendor_name": "Vendor Corp Ltd.",
            "game_station": "PlayStation Arena",
            "region": "Northern ",
            "date": "2025-03-25",
            "receipt_no": "R-1001",
            "game_details": {
                "customer_name": "John Doe",
                "machine_no_name": "GS-2024",
                "game_profit": 50,
                "customer_deposit": 100,
                "paid_to_customer": 150
            },
            "commission_structure": {
                "commission_type": "profit_sharing",
                "vendor_share": 0.4,
                "client_share": 0.6,
                "minimum_threshold": 0,
                "maximum_cap": 1000
            },
            "commission_calculation": {
                "vendor_commission": 20,
                "client_earnings": 30,
                "previous_balance": 0,
                "new_balance": 20
            },
            "payout_information": {
                "payout_date": "2025-04-05",
                "payout_method": "bank_transfer",
                "payout_status": "pending"
            }
        }
    },
    {
        "commission_calculation": {
            "client_id": "C001",
            "client_name": "GameZone Inc.",
            "client_image": "https://randomuser.me/api/portraits/men/2.jpg",
            "vendor_name": "Vendor Corp Ltd.",
            "game_station": "XBox Pavilion",
            "region": "Western ",
            "date": "2025-03-25",
            "receipt_no": "R-1002",
            "game_details": {
                "customer_name": "Sarah Smith",
                "machine_no_name": "XB-3056",
                "game_profit": 120,
                "customer_deposit": 200,
                "paid_to_customer": 320
            },
            "commission_structure": {
                "commission_type": "profit_sharing",
                "vendor_share": 0.35,
                "client_share": 0.65,
                "minimum_threshold": 0,
                "maximum_cap": 1000
            },
            "commission_calculation": {
                "vendor_commission": 42,
                "client_earnings": 78,
                "previous_balance": 20,
                "new_balance": 62
            },
            "payout_information": {
                "payout_date": "2025-04-05",
                "payout_method": "bank_transfer",
                "payout_status": "pending"
            }
        }
    },
    {
        "commission_calculation": {
            "client_id": "C002",
            "client_name": "Arcade Masters",
            "client_image": "https://randomuser.me/api/portraits/men/3.jpg",
            "vendor_name": "Vendor Corp Ltd.",
            "game_station": "VR Zone",
            "region": "Eastern ",
            "date": "2025-03-26",
            "receipt_no": "R-1003",
            "game_details": {
                "customer_name": "Mike Johnson",
                "machine_no_name": "VR-4090",
                "game_profit": 75,
                "customer_deposit": 150,
                "paid_to_customer": 225
            },
            "commission_structure": {
                "commission_type": "profit_sharing",
                "vendor_share": 0.45,
                "client_share": 0.55,
                "minimum_threshold": 0,
                "maximum_cap": 800
            },
            "commission_calculation": {
                "vendor_commission": 33.75,
                "client_earnings": 41.25,
                "previous_balance": 0,
                "new_balance": 33.75
            },
            "payout_information": {
                "payout_date": "2025-04-05",
                "payout_method": "bank_transfer",
                "payout_status": "pending"
            }
        }
    },
    {
        "commission_calculation": {
            "client_id": "C003",
            "client_name": "Digital Playground",
            "client_image": "https://randomuser.me/api/portraits/men/4.jpg",
            "vendor_name": "Vendor Corp Ltd.",
            "game_station": "Racing Simulators",
            "region": "Southern ",
            "date": "2025-03-28",
            "receipt_no": "R-1005",
            "game_details": {
                "customer_name": "Alex Chen",
                "machine_no_name": "RS-2024",
                "game_profit": 210,
                "customer_deposit": 300,
                "paid_to_customer": 510
            },
            "commission_structure": {
                "commission_type": "tiered_profit_sharing",
                "tiers": [
                    {
                        "threshold": 0,
                        "vendor_share": 0.3,
                        "client_share": 0.7
                    },
                    {
                        "threshold": 100,
                        "vendor_share": 0.4,
                        "client_share": 0.6
                    },
                    {
                        "threshold": 200,
                        "vendor_share": 0.5,
                        "client_share": 0.5
                    }
                ],
                "maximum_cap": 1500
            },
            "commission_calculation": {
                "vendor_commission": 84,
                "client_earnings": 126,
                "previous_balance": 0,
                "new_balance": 84
            },
            "payout_information": {
                "payout_date": "2025-04-05",
                "payout_method": "bank_transfer",
                "payout_status": "pending"
            }
        }
    }
];
