//
//  CDVSpeak.m
//  Counting
//
//  Created by Nukorn  on 8/27/2557 BE.
//
//

#import <Foundation/Foundation.h>
#import "CDVSpeak.h"
#import <AVFoundation/AVFoundation.h>

@interface CDVSpeak () <AVSpeechSynthesizerDelegate>

@end

@implementation CDVSpeak

- (void)speak : (CDVInvokedUrlCommand*)command {
    
    NSString* word = [command.arguments objectAtIndex:0];
    NSString* lang = [command.arguments objectAtIndex:1];
    
    NSLog(@"word=%@  :: lang=%@", word, lang);
    
    AVSpeechSynthesizer *synthesizer = [[AVSpeechSynthesizer alloc]init];
    AVSpeechUtterance *utterance = [AVSpeechUtterance speechUtteranceWithString: word];
    [utterance setRate:0.25f];
    
    utterance.voice = [AVSpeechSynthesisVoice voiceWithLanguage:lang];
    
    [synthesizer speakUtterance:utterance];
    
}

@end