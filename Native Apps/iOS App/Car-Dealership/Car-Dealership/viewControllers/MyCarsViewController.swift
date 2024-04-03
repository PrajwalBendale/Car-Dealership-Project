//
//  MyCarsViewController.swift
//  Car-Dealership
//
//  Created by PBen on 19/02/24.
//

import UIKit
import Alamofire

class MyCarsViewController: BaseViewController,UITableViewDataSource,UITableViewDelegate {
    
    @IBOutlet weak var myCarsTableView: UITableView!
    var cars: [Car] = []
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return cars.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        
        let cell = tableView.dequeueReusableCell(withIdentifier: "cell2")!
        /*
         let imageView = cell.viewWithTag(100) as! UIImageView
                let labelTitle = cell.viewWithTag(101) as! UILabel
                let labelCategory = cell.viewWithTag(102) as! UILabel
                let labelPrice = cell.viewWithTag(103) as! UILabel
                let buttonAddToCart = cell.viewWithTag(104) as! UIButton
                
                let product = products[indexPath.row]
                labelTitle.text = product.title
                labelCategory.text = "\(product.category!), \(product.company!)"
                labelPrice.text = "MRP: \(product.mrp!) Discount: \(product.discount!)%
         */
        let image = cell.viewWithTag(11) as! UIImageView
        let labelMake = cell.viewWithTag(12) as! UILabel
        let labelModel = cell.viewWithTag(13) as! UILabel
        let labePrice = cell.viewWithTag(14) as! UILabel
        
        let car = cars[indexPath.row]
        
        labelMake.text="\(car.make!)"
        labelModel.text="Model: \(car.model!)"
        labePrice.text="Price: \(car.price!)"
        loadImage(image: car.image, imageView: image)
        
        
        //startDetails(data: car.carid)as? String
//        cell.detailTextLabel?.text=car.price as? String
//        cell.detailTextLabel?.text=car.model
        return cell
    }
    
    

    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.myCarsTableView.delegate=self
        self.myCarsTableView.dataSource=self

        // Do any additional setup after loading the view.
    }
    override func viewDidAppear(_ animated: Bool) {
        loadMyCars()
    }
    override func viewDidDisappear(_ animated: Bool) {
        self.cars.removeAll()
    }
    
    func loadMyCars(){
        
        if let idAsInt = UserDefaults.standard.value(forKey: "User_id") as? Int{
            
            let id = String(idAsInt)
            let header: HTTPHeaders = [
                "id": id
            ]
            let url=createURL(path: "/customers/sales/")
            let req=AF.request(url,method: .get,headers: header)
            
            req.response(completionHandler: { response in
                
                switch response.result {
                case .success(let value):
                    
                    if let data = value{
                        
                        let json = try! JSONSerialization.jsonObject(with: data, options: []) as? [String: Any]
                        
                        if json!["message"] as! String=="success"{
                            
                            if let resultArray = json!["result"] as? [Any], !resultArray.isEmpty {
                                
                                let carsLS=resultArray as! [[String: Any]]
                                for carls in carsLS{
                                    let car = Car()
                                    car.carid=carls["CarID"] as? Int
                                    car.make=carls["Make"] as? String
                                    car.model=carls["Model"] as? String
                                    car.price=carls["Price"] as? String
                                    car.status=carls["Status"] as? String
                                    car.year=carls["Year"] as? Int
                                    car.vin=carls["VIN"] as? Double
                                    car.image=carls["image"] as? String
                                    
                                    
                                    self.cars.append(car)
                                    
                                }
                                self.myCarsTableView.reloadData()
                            }
                            else{
                                self.showSuccess(message: "There is no such Purchases")
                            }
                        }
                        else {
                            self.showError(message: json!["message"] as! String)
                        }
                        
                    }
                    
                case let .failure(Error):
                    print(Error)
                }
                
            })
        }
    }
}
