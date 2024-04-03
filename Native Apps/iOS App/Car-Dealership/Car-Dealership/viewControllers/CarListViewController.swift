//
//  CarListViewController.swift
//  Car-Dealership
//
//  Created by PBen on 15/02/24.
//

import UIKit
import Alamofire

class CarListViewController: BaseViewController,UITableViewDataSource,UITableViewDelegate {
    
    var cars: [Car] = []
    @IBOutlet weak var carList: UITableView!
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return cars.count
    }

    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        
        let cell = tableView.dequeueReusableCell(withIdentifier: "cell")!
        
        let image = cell.viewWithTag(1) as! UIImageView
        let labelMake = cell.viewWithTag(2) as! UILabel
        let labelModel = cell.viewWithTag(3) as! UILabel
        let labePrice = cell.viewWithTag(4) as! UILabel
        
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
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
        
        let onecar = cars[indexPath.row]
        let id: Int? = onecar.carid
        let sc = self.view.window?.windowScene?.delegate as! SceneDelegate
        sc.startDetails(data: id!)
        
    }

    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.carList.delegate=self
        self.carList.dataSource=self

        // Do any additional setup after loading the view.
    }
    override func viewDidDisappear(_ animated: Bool) {
        self.cars.removeAll()
    }
    
    override func viewDidAppear(_ animated: Bool) {
        loadCars()
    }
    
    
    func loadCars(){
        
        let url=createURL(path: "/cars/")
        let req=AF.request(url,method: .get)
        
        req.response(completionHandler: { response in
            
                switch response.result {
                case .success(let value):
                    
                    if let data = value{
                        
                    let json = try! JSONSerialization.jsonObject(with: data, options: []) as! [String: Any]
                        
                            
                            
                        if json["message"] as! String=="success"{
                            
                            let carsLS=json["result"] as! [[String: Any]]
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
                            self.carList.reloadData()
                        }
                            else {
                                self.showError(message: json["message"] as! String)
                            }
                        
                    }
                    
                case let .failure(Error):
                    print(Error)
                }
            
        })
    }
}
    

