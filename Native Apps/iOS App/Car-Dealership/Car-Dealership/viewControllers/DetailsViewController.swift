//
//  DetailsViewController.swift
//  Car-Dealership
//
//  Created by PBen on 16/02/24.
//

import UIKit
import Alamofire

class DetailsViewController: BaseViewController {

    @IBOutlet weak var imageCar: UIImageView!
    @IBOutlet weak var model: UILabel!
    @IBOutlet weak var make: UILabel!
    @IBOutlet weak var year: UILabel!
    @IBOutlet weak var price: UILabel!
    @IBOutlet weak var avail: UILabel!
    var recieved_id: Int?
    override func viewDidLoad() {
        super.viewDidLoad()
        
    
    }
    
    override func viewDidAppear(_ animated: Bool) {
        loadCar(id: recieved_id!)
    }
    
    @IBAction func onBack(_ sender: Any) {
        let sc=self.view.window?.windowScene?.delegate as! SceneDelegate
        sc.startHome()
    }
    
    @IBAction func onSendCar(_ sender: Any) {
        if let idAsInt = UserDefaults.standard.value(forKey: "User_id") as? Int{
            
            let id = String(idAsInt)
            let carid = "\(recieved_id ?? 0)"
            let header: [String: Any] = [
                "CustomerId": id,
                "CarId": carid
            ]
            let url=createURL(path: "/inq/")
            let req=AF.request(url,method: .post,parameters: header,encoding: JSONEncoding.default)
            
            req.response(completionHandler: {response in
                switch response.result {
                case .success(let value):
                    if let data = value{
                        let json = try! JSONSerialization.jsonObject(with: data, options: []) as? [String: Any]
                        if json!["message"] as! String=="success"{
                            self.showSuccess(message: "Success")
                            let sc=self.view.window?.windowScene?.delegate as! SceneDelegate
                            sc.startHome()
                        }
                        else{
                            self.showSuccess(message: "Something wrong happened!!!")
                        }
                    }
                    
                case let .failure(Error):
                    print(Error)
                    self.showError(message: "Error")
                }
            })
        }
    }
                    
                    
//                    if let data = value{
//                        
//                        let json = try! JSONSerialization.jsonObject(with: data, options: []) as? [String: Any]
//                        
//                        if json!["message"] as! String=="success"{
//                            
//                        }
//                        else {
//                                self.showError(message: json!["message"] as! String)
//                            }
//                        }
//                    }
//                case let .failure(Error):
//                    print(Error)
//                }
//                
        
        
    
    func loadCar(id: Int)  {
        
        let url = createURL(path: "/cars/car/")
        let info: [String: Any] =
        ["CarId":recieved_id!]
        
        let req=AF.request(url,method: .post,parameters: info,encoding: JSONEncoding.default)
        
        req.response(completionHandler: { [self]response in
                switch response.result{
                    
                case .success(let value):
                    if let data = value{
                        let json = try! JSONSerialization.jsonObject(with: data, options: []) as! [String: Any]
                        
                        
                            if(json["message"] as! String=="success"){
                                /*
                                 let carsLS=json["result"] as! [[String: Any]]
                                 */
                                let car=json["result"] as! [[String: Any]]
                                for carls in car{
                                
                                self.make.text=carls["Make"] as? String
                                
                                self.model.text=carls["Model"] as? String
                                    let yearint=carls["Year"] as? Int
                                    self.year.text=String(yearint!)
                                
                                self.price.text=carls["Price"] as? String
                                
                                self.avail.text=carls["Status"] as? String
                                    
                                    loadImage(image: (carls["image"] as? String)!, imageView: imageCar)
                                }
                            }
                            else{
                                self.showError(message: json["message"] as! String)
                            }
                        
                        
                    }
                case let .failure(Error):
                    print(Error)
                }
            })
        
    }

}
