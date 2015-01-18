//
//  CDVSpeak.h
//  Counting
//
//  Created by Nukorn  on 8/27/2557 BE.
//
//

#import <Cordova/CDVPlugin.h>
#import <Cordova/CDVInvokedUrlCommand.h>

@interface CDVSpeak  : CDVPlugin {

}

-(void)speak:(CDVInvokedUrlCommand*)command;

@end