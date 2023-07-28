Programa
   AntesDeIniciar
     Go HOME
       MoverJ
         HOME
     Variable initialization
       Box_Lenght≔0.200
       Box_Width≔0.200
       Box_Hight≔0.2
       Total_Layers≔4
       Boxes_Layer≔9
       First running
         Actual_Layer≔1
         Actual_Box≔1
         Actual_L_Hight≔Box_Hight
         Layer_Reference≔pose_trans(Pallet_R_Ref, p[0,0,-Actual_L_Hight,0,0,0])
         Catch_Reference≔Catch_Ref
         Pallet_side≔1
         Pallet_Switch≔ False 
     Catch points
       Catch_position≔pose_trans(Catch_Reference,p[0,0.5*Box_Width,-Box_Hight,0,0,0])
       Catch_Nexus≔pose_trans(Catch_Ref,p[0,0,-0.500,0,0,0])
       Aprox_Catch_2≔pose_trans(Catch_position, p[0,0,-0.05,0,0,0])
       Aprox_Catch_1≔pose_trans(Catch_position, p[0,0,-0.015,0,0,0])
       Exit_Catch≔pose_trans(Catch_position, p[0,0,-0.5*Box_Hight,0,0,0])
     Placement points
       Place_Nex_Right≔pose_trans(Pallet_R_Ref,p[-0.200,0.200,-1,0,0,0])
       Place_Nex_Left≔pose_trans(Pallt_L_Ref, p[0.200,0.200,-1,0,0,0])
       Layer_Nx_Right≔pose_trans(Pallet_R_Ref, p[0,0,3*Box_Hight,0,0,0])
       Layer_Nx_Left≔pose_trans(Pallt_L_Ref,p[0,0,3*Box_Hight,0,0,0])
     Box points
       'This points come from the box position interface.'
       Odd layer
         Odd_Box_1≔p[0,0,0,0,0,0]
         Odd_Box_2≔p[0,0,0,0,0,0]
         Odd_Box_3≔p[0,0,0,0,0,0]
         Odd_Box_4≔p[0,0,0,0,0,0]
         Odd_Box_5≔p[0,0,0,0,0,0]
         Odd_Box_6≔p[0,0,0,0,0,0]
         Odd_Box_7≔p[0,0,0,0,0,0]
         Odd_Box_8≔p[0,0,0,0,0,0]
         Odd_Box_9≔p[0,0,0,0,0,0]
       Even layer
         Even_Box_1≔p[0,0,0,0,0,0]
         Even_Box_2≔p[0,0,0,0,0,0]
         Even_Box_3≔p[0,0,0,0,0,0]
         Even_Box_4≔p[0,0,0,0,0,0]
         Even_Box_5≔p[0,0,0,0,0,0]
         Even_Box_6≔p[0,0,0,0,0,0]
         Even_Box_7≔p[0,0,0,0,0,0]
         Even_Box_8≔p[0,0,0,0,0,0]
         Even_Box_9≔p[0,0,0,0,0,0]
   Programa de robot
     Layer selection
       'The program will write every case according to the number of pallet layers.'
       Interruptor Actual_Layer
         Caso 1
           Odd Layer
             Interruptor Actual_Box
               Caso 1
                 Odd Box 1
                   Actual_PlaceBox≔pose_trans(Layer_Reference,Odd_Box_1)
                   Actual_A_Place≔1
               Caso 2
                 Odd Box 2
                   Actual_PlaceBox≔pose_trans(Layer_Reference,Odd_Box_2)
                   Actual_A_Place≔2
               Caso 3
                 Odd Box 3
                   Actual_PlaceBox≔pose_trans(Layer_Reference,Odd_Box_3)
                   Actual_A_Place≔3
               Caso 4
                 Odd Box 4
                   Actual_PlaceBox≔pose_trans(Layer_Reference,Odd_Box_4)
                   Actual_A_Place≔4
               Caso 5
                 Odd Box 5
                   Actual_PlaceBox≔pose_trans(Layer_Reference,Odd_Box_5)
                   Actual_A_Place≔5
               Caso 6
                 Odd Box 6
                   Actual_PlaceBox≔pose_trans(Layer_Reference,Odd_Box_6)
                   Actual_A_Place≔6
               Caso 7
                 Odd Box 7
                   Actual_PlaceBox≔pose_trans(Layer_Reference,Odd_Box_7)
                   Actual_A_Place≔7
               Caso 8
                 Odd Box 8
                   Actual_PlaceBox≔pose_trans(Layer_Reference,Odd_Box_8)
                   Actual_A_Place≔8
               Caso 9
                 Odd Box 9
                   Actual_PlaceBox≔pose_trans(Layer_Reference,Odd_Box_9)
                   Actual_A_Place≔9
         Caso 2
           Even Layer
             Interruptor Actual_Box
               Caso 1
                 Even Box 1
                   Actual_PlaceBox≔pose_trans(Layer_Reference,Even_Box_1)
                   Actual_A_Place≔1
               Caso 2
                 Even Box 2
                   Actual_PlaceBox≔pose_trans(Layer_Reference,Even_Box_2)
                   Actual_A_Place≔2
               Caso 3
                 Even Box 3
                   Actual_PlaceBox≔pose_trans(Layer_Reference,Even_Box_3)
                   Actual_A_Place≔3
               Caso 4
                 Even Box 4
                   Actual_PlaceBox≔pose_trans(Layer_Reference,Even_Box_4)
                   Actual_A_Place≔4
               Caso 5
                 Even Box 5
                   Actual_PlaceBox≔pose_trans(Layer_Reference,Even_Box_5)
                   Actual_A_Place≔5
               Caso 6
                 Even Box 6
                   Actual_PlaceBox≔pose_trans(Layer_Reference,Even_Box_6)
                   Actual_A_Place≔6
               Caso 7
                 Even Box 7
                   Actual_PlaceBox≔pose_trans(Layer_Reference,Even_Box_7)
                   Actual_A_Place≔7
               Caso 8
                 Even Box 8
                   Actual_PlaceBox≔pose_trans(Layer_Reference,Even_Box_8)
                   Actual_A_Place≔8
               Caso 9
                 Even Box 9
                   Actual_PlaceBox≔pose_trans(Layer_Reference,Even_Box_9)
                   Actual_A_Place≔9
         Caso 3
           Odd Layer
             Interruptor Actual_Box
               Caso 1
                 Odd Box 1
                   Actual_PlaceBox≔pose_trans(Layer_Reference,Odd_Box_1)
                   Actual_A_Place≔1
               Caso 2
                 Odd Box 2
                   Actual_PlaceBox≔pose_trans(Layer_Reference,Odd_Box_2)
                   Actual_A_Place≔2
               Caso 3
                 Odd Box 3
                   Actual_PlaceBox≔pose_trans(Layer_Reference,Odd_Box_3)
                   Actual_A_Place≔3
               Caso 4
                 Odd Box 4
                   Actual_PlaceBox≔pose_trans(Layer_Reference,Odd_Box_4)
                   Actual_A_Place≔4
               Caso 5
                 Odd Box 5
                   Actual_PlaceBox≔pose_trans(Layer_Reference,Odd_Box_5)
                   Actual_A_Place≔5
               Caso 6
                 Odd Box 6
                   Actual_PlaceBox≔pose_trans(Layer_Reference,Odd_Box_6)
                   Actual_A_Place≔6
               Caso 7
                 Odd Box 7
                   Actual_PlaceBox≔pose_trans(Layer_Reference,Odd_Box_7)
                   Actual_A_Place≔7
               Caso 8
                 Odd Box 8
                   Actual_PlaceBox≔pose_trans(Layer_Reference,Odd_Box_8)
                   Actual_A_Place≔8
               Caso 9
                 Odd Box 9
                   Actual_PlaceBox≔pose_trans(Layer_Reference,Odd_Box_9)
                   Actual_A_Place≔9
     Corner aproximation points
       If Pallet_side≟1
         Right pallet
           Normal
             Ap_P_Normal≔pose_trans(Actual_PlaceBox, p[0,0,-1*Box_Hight,0,0,0])
           Up
             Ap_P_Up≔pose_trans(Actual_PlaceBox, p[0,1*Box_Width,-1*Box_Hight,0,0,0])
           Down
             Ap_P_Down≔pose_trans(Actual_PlaceBox, p[0,-1*Box_Width,-1*Box_Hight,0,0,0])
           Right
             Ap_P_Right≔pose_trans(Actual_PlaceBox, p[1*Box_Lenght,0,-1*Box_Hight,0,0,0])
           Left
             Ap_P_Left≔pose_trans(Actual_PlaceBox, p[-1*Box_Lenght,0,-1*Box_Hight,0,0,0])
           Upright
             Ap_P_Upright≔pose_trans(Actual_PlaceBox, p[1*Box_Lenght,1*Box_Width,-1*Box_Hight,0,0,0])
           Upleft
             Ap_P_Upleft≔pose_trans(Actual_PlaceBox, p[-1*Box_Lenght,1*Box_Width,-1*Box_Hight,0,0,0])
           Downright
             Ap_P_Downright≔pose_trans(Actual_PlaceBox, p[1*Box_Lenght,-1*Box_Width,-1*Box_Hight,0,0,0])
           Downleft
             Ap_P_Downleft≔pose_trans(Actual_PlaceBox, p[-1*Box_Lenght,-1*Box_Width,-1*Box_Hight,0,0,0])
       Else
         Left Pallet
           Normal
             Ap_P_Normal≔pose_trans(Actual_PlaceBox, p[0,0,-1*Box_Hight,0,0,0])
           Up
             Ap_P_Up≔pose_trans(Actual_PlaceBox, p[0,-1*Box_Width,-1*Box_Hight,0,0,0])
           Down
             Ap_P_Down≔pose_trans(Actual_PlaceBox, p[0,1*Box_Width,-1*Box_Hight,0,0,0])
           Right
             Ap_P_Right≔pose_trans(Actual_PlaceBox, p[-1*Box_Lenght,0,-1*Box_Hight,0,0,0])
           Left
             Ap_P_Left≔pose_trans(Actual_PlaceBox, p[1*Box_Lenght,0,-1*Box_Hight,0,0,0])
           Upright
             Ap_P_Upright≔pose_trans(Actual_PlaceBox, p[-1*Box_Lenght,-1*Box_Width,-1*Box_Hight,0,0,0])
           Upleft
             Ap_P_Upleft≔pose_trans(Actual_PlaceBox, p[-1*Box_Lenght,1*Box_Width,-1*Box_Hight,0,0,0])
           Downright
             Ap_P_Downright≔pose_trans(Actual_PlaceBox, p[1*Box_Lenght,-1*Box_Width,-1*Box_Hight,0,0,0])
           Downleft
             Ap_P_Downleft≔pose_trans(Actual_PlaceBox, p[1*Box_Lenght,1*Box_Width,-1*Box_Hight,0,0,0])
     Actual_A_Place assignments
       Interruptor Actual_A_Place
         Caso 1
           Normal
             Ap_Point_Place≔Ap_P_Normal
         Caso 2
           Up
             Ap_Point_Place≔Ap_P_Up
         Caso 3
           Down
             Ap_Point_Place≔Ap_P_Down
         Caso 4
           Right
             Ap_Point_Place≔Ap_P_Right
         Caso 5
           Left
             Ap_Point_Place≔Ap_P_Left
         Caso 6
           Upright
             Ap_Point_Place≔Ap_P_Upright
         Caso 7
           Upleft
             Ap_Point_Place≔Ap_P_Upleft
         Caso 8
           Downright
             Ap_Point_Place≔Ap_P_Downright
         Caso 9
           Downleft
             Ap_Point_Place≔Ap_P_Downleft
     Join and Exit placement points
       Join_Place≔pose_trans(Actual_PlaceBox,p[0,0,-0.2*Box_Hight,0,0,0])
       Exit_Place≔pose_trans(Actual_PlaceBox,p[0,0,-0.2,0,0,0])
     Placement Nexus points
       If Pallet_side≟1
         Placement_Nexus≔Place_Nex_Right
         Layer_Nexus≔pose_trans(Layer_Reference, p[0,0,-1.1*Box_Hight,0,0,0])
       ElseIf Pallet_side≟2
         Placement_Nexus≔Place_Nex_Left
         Layer_Nexus≔pose_trans(Layer_Reference, p[0,0,-1.1*Box_Hight,0,0,0])
     Execution 
       Catch secuence
         MoverJ
           Catch_Nexus
           'Aviso'
           MoverL
             Aprox_Catch_2
             'Aviso'
             Aprox_Catch_1
             'Aviso'
             Catch_position
             'Aviso'
             Exit_Catch
             'Aviso'
       Placement secuence
         MoverJ
           Placement_Nexus
           'Aviso'
           'Layer_Nexus'
           'Aviso'
           MoverL
             Ap_Point_Place
             'Aviso'
             Join_Place
             'Aviso'
             Actual_PlaceBox
             'Aviso'
             Exit_Place
             'Aviso'
     Variable sync
       Actual_Box≔Actual_Box + 1
       Layer change
         If Actual_Box>Boxes_Layer
           Actual_Box≔1
           Actual_Layer≔Actual_Layer+1
           Actual_L_Hight≔Actual_Layer*Box_Hight
           If Pallet_side≟1
             Layer_Reference≔pose_trans(Pallet_R_Ref, p[0,0,-Actual_L_Hight,0,0,0])
           Else
             Layer_Reference≔pose_trans(Pallt_L_Ref, p[0,0,-Actual_L_Hight,0,0,0])
       Pallet completed
         If Actual_Layer>Total_Layers
           Actual_Box≔1
           Actual_Layer≔1
           Actual_L_Hight≔Box_Hight
           MoverJ
             HOME
           Aviso
           Switch pallet
             Pallet_Switch≔'Do you want to switch the pallet side?'
             If Pallet_side≟1 and Pallet_Switch≟ True 
               Pallet_side≔2
               Layer_Reference≔pose_trans(Pallt_L_Ref, p[0,0,-Actual_L_Hight,0,0,0])
             ElseIf Pallet_side≟2 and Pallet_Switch≟ True 
               Pallet_side≔1
               Layer_Reference≔pose_trans(Pallet_R_Ref, p[0,0,-Actual_L_Hight,0,0,0])
