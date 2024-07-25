//
//  utils.swift
//  Car-Dealership
//
//  Created by PBen on 13/02/24.
//

import Foundation
import UIKit
import Alamofire

let URL = //"https://car-dealership-node-server.onrender.com"
//"https://aqueous-reaches-99626-caf016487b6c.herokuapp.com"
"http://localhost:9999"

func createURL(path: String) -> String {
    return "\(URL)\(path)"
}

func loadImage(image: String, imageView: UIImageView) {
    
    let url=createURL(path: "/" + image)
    let request = AF.request(url, method: .get)
    request.response (completionHandler: {
        response in
        switch response.result {
        case let .success(data):
            if let data = data {
                
                
                // convert the data to uiimage
                let image = UIImage(data: data)
                
                // set the image to imageview
                imageView.image = image
                
            }
        case let .failure(error):
            print (error)
            
            
        }
    }) 
}
