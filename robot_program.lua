-----------------SCRIPT GENERADO EN APP------------
	boxLenght = 200
	boxWidth = 200
	boxHeight = 200
	
	palletLenght = 1200
	palletWidth = 800
	palletHeight = 144
	
	oddPosX = {-500,-500,-500,-500,-300,-300,-300,-300,-100,-100,-100,-100,100,100,100,100,300,300,300,300,500,500,500,500}
	oddPosY = {-300,-100,100,300,-300,-100,100,300,-300,-100,100,300,-300,-100,100,300,-300,-100,100,300,-300,-100,100,300}
	oddRot = {0.000,0.000,4.712,3.142,0.000,0.000,0.000,3.142,0.000,0.000,0.000,9.425,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000}
	
	evenPosX = {500,500,500,500,300,300,300,300,100,100,100,100,-100,-100,-100,-100,-300,-300,-300,-300,-500,-500,-500,-500}
	evenPosY = {300,100,-100,-300,300,100,-100,-300,300,100,-100,-300,300,100,-100,-300,300,100,-100,-300,300,100,-100,-300}
	evenRot = {3.142,3.142,7.854,6.283,3.142,3.142,3.142,6.283,3.142,3.142,3.142,12.566,3.142,3.142,3.142,3.142,3.142,3.142,3.142,3.142,3.142,3.142,3.142,3.142}
	
	totalOddLayers = 24
	totalEvenLayers = 24
	totalLayers = 8
	interlayer = false
	
--------------VARIABLES GLOBALES DEL PROGRAMA-------
	actualHeight = 0
	actualLayer = 1
	actualBox = 0
	rightPallet = false
	leftPallet = false
	executionOn = false
	
---------------------ASIGNACIÓN DE PUNTOS-----------
--Asignación de los puntos de cogida.
	P11 = RP(P10, {0,(0.5*boxWidth),800})
	P12 = RP(P10, {0,(0.5*boxWidth),(0.5*boxHeight+100)})
	P13 = RP(P10, {0,(0.5*boxWidth),(0.5*boxHeight+50)})
	P14 = RP(P10, {0,(0.5*boxWidth),(0.5*boxHeight)})
	
	P15 = RP(P10, {0,(0.5*boxWidth),(0.5*boxHeight+100)})
	
---------------CONSTANTES DEL PROGRAMA--------------
	Accel(20)
	Speed(20)
	
---------------------PROGRAMA ROBOT-----------------
--Ir a la posición de HOME.
	Move(P1)
	
--Determinar pallet activo.

if(DI(3) == 1 and DI(4) == 1) then
	rightPallet = true
	leftPallet = false
	executionOn = true
end
if(DI(5) == 1 and DI(5) == 1) then
	rightPallet = false
	leftPallet = true
	executionOn = true
end
	
--Secuencia de cogida de caja.
while (executionOn == true) do
	Go(P11)
	Go(P12)
	Accel(10)
	Speed(10)
	Go(P13)
	Go(P14)
	DO(1,ON)
	while(DI(1) == 0) do
		if(DI(1) == 1) then
			break
		end
	end
	sleep(1)
	Go(P15)
	Accel(20)
	Speed(20)
	
	for actualLayer=0,totalLayers do
	
	--Secuencia de dejada de caja.
		if (actualLayer % totalLayers == 1) then
			for index=1,#oddPosX do
				--Cálculo de los puntos de dejada de caja.
				actualHeight = palletHeight + boxHeight*actualLayer
				
				P21 = RP(P20,{0, 0, actualHeight + boxHeight + 100})
				P24 = RP(P20,{oddPosX[index], oddPosY[index], actualHeight})
				P22 = RP(P24,{0, 0, 100})
				P23 = RP(P24,{0, 0, 50})
				P25 = RP(P24,{0, 0, 100})
				
				--Secuencia de dejada de caja.
				Go(P21)
				Go(P22)
				Accel(10)
				Speed(10)
				Go(P23)
				Go(P24)
				DO(1,OFF)
				
				while(DI(1) == 1) do
					if(DI(1) == 0) then
						break
					end
				end
				
				sleep(1)
				Go(P25)
				Accel(20)
				Speed(20)
			end
		else
			for index=1,#evenPosX do
				print()
				--Cálculo de los puntos de dejada de caja.
				actualHeight = palletHeight + boxHeight*actualLayer
				
				P21 = RP(P30,{0, 0, actualHeight + boxHeight + 100})
				P24 = RP(P30,{evenPosX[index], evenPosY[index], actualHeight})
				P22 = RP(P24,{0, 0, 100})
				P23 = RP(P24,{0, 0, 50})
				P25 = RP(P24,{0, 0, 100})
				
				--Secuencia de dejada de caja.
				Go(P21)
				Go(P22)
				Accel(10)
				Speed(10)
				Go(P23)
				Go(P24)
				DO(1,OFF)
				
				while(DI(1) == 1) do
					if(DI(1) == 0) then
						break
					end
				end
				
				sleep(1)
				Go(P25)
				Accel(20)
				Speed(20)
			end
		end
		
		--actualLayer = actualLayer + 1
		
		--Movimiento hacia el interlayer.
		if(interlayer == true) then
			Go(P41)
			Accel(10)
			Speed(10)
			Go(P42)
			Go(P43)
			DO(2,ON)
			
			while(DI(2) == 0) do
				if(DI(2) == 1) then
					break
				end
			end
			
			Accel(20)
			Speed(20)
			Go(P21)
			Accel(10)
			Speed(10)
			Go(P45)
			Go(P46)
			DO(2,OFF)
			
			while(DI(2) == 1) do
				if(DI(2) == 0) then
					break
				end
			end
			Go(P47)
			Accel(20)
			Speed(20)
		end
	end
end