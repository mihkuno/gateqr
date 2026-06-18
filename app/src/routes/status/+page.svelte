<script lang="ts">
    // let role = $state('')
    let section = $state(4)
    // let owner = $state('no')
    let dept = $state('')


    let tab = $state('validation');
    let owner = $state('no');
    let role = $state('employee');
</script>


<div class="flex items-center justify-center bg-gray-100 py-10 min-h-screen">
    <div class="flex flex-col w-lg gap-2">

        <p class="m-auto mb-4 text-lg">
            Welcome, <span class="font-medium">joenino.cainday@liceo.edu.ph</span>
        </p>

        <label class="flex items-center gap-2 text-sm">
            <input type="checkbox" checked disabled>
            <span>Step 1: Approval from the College Head</span>
        </label>

        <label class="flex items-center gap-2 text-sm text-gray-400">
            <input type="checkbox" disabled>
            <span>Step 2: Approval from the Office of Student Affairs</span>
        </label>

        <label class="flex items-center gap-2 text-sm text-gray-400">
            <input type="checkbox" disabled>
            <span>Step 3: Visit OSA to acquire the official QR Code sticker</span>
        </label>
        
        <div class="border p-4 flex flex-col gap-4 bg-white">
            
            <!-- Top section: QR + Details -->
            <div class="flex flex-col sm:flex-row gap-3 sm:gap-2 items-start">
                
                <!-- Details -->
                <div class="flex items-start justify-between w-full min-w-0">
                    <table class="text-sm sm:ml-4 w-full">
                        <tbody>
                            <tr>
                                <td class="font-medium pr-4 pb-1 whitespace-nowrap align-top">ID:</td>
                                <td class="pb-1 break-all">2022307166</td>
                            </tr>
                            <tr>
                                <td class="font-medium pr-4 pb-1 whitespace-nowrap align-top">Name:</td>
                                <td class="pb-1">Joeninyo Cainday</td>
                            </tr>
                            <tr>
                                <td class="font-medium pr-4 pb-1 whitespace-nowrap align-top">Email:</td>
                                <td class="pb-1 break-all">joenino.cainday@liceo.edu.ph</td>
                            </tr>
                            <tr>
                                <td class="font-medium pr-4 pb-1 whitespace-nowrap align-top">department:</td>
                                <td class="pb-1">BSCS</td>
                            </tr>
                            <tr>
                                <td class="font-medium pr-4 pb-1 whitespace-nowrap align-top">dean:</td>
                                <td class="pb-1">junar.landicho@liceo.edu.ph</td>
                            </tr>
                            <tr>
                                <td class="font-medium pr-4 pb-1 whitespace-nowrap align-top">Vehicle:</td>
                                <td class="pb-1">Toyota Corolla</td>
                            </tr>
                            <tr>
                                <td class="font-medium pr-4 pb-1 whitespace-nowrap align-top">Plate:</td>
                                <td class="pb-1">ABC-1234</td>
                            </tr>
                            <tr>
                                <td class="font-medium pr-4 pb-1 whitespace-nowrap align-top">Owner:</td>
                                <td class="pb-1">No</td>
                            </tr>
                        </tbody>
                    </table>

                    <!-- Status -->
                    <div class="flex flex-col gap-1 shrink-0">
                        <div class="border p-1 font-medium text-[11px] shrink-0">CRD: Feb 06 2023</div>
                        <div class="border p-1 font-medium text-[11px] shrink-0">APV: Feb 06 2023</div>
                        {#if tab !== 'validation'}
                            <div class="border p-1 font-medium text-[11px] shrink-0">SCH: Feb 06 2023</div>
                            {#if ['monitoring', 'history'].includes(tab)}    
                                <div class="border p-1 font-medium text-[11px] shrink-0">DLV: Mar 24 2024</div>
                            {/if}
                            <div class="border p-1 font-medium text-[11px] shrink-0">EXP: Mar 24 2024</div>
                        {/if}
                        {#if tab === 'history'}
                            <div class="border p-1 font-medium text-[11px] shrink-0">STS: Expired</div>
                        {/if}
                    </div>
                        
                </div>

            </div>

            <!-- Document buttons -->
            <div class="flex flex-col gap-2">
                {#if role !== 'visitor'}
                    <div class="grid gap-2 {owner === 'no' ? 'grid-cols-3' : 'grid-cols-2'}">
                        <div class="border w-full h-20 flex justify-center items-center text-xs cursor-pointer hover:bg-gray-100">
                            (Liceo) {role === 'student' ? 'Student' : 'Employee'} ID
                        </div>
                        <div class="border w-full h-20 flex justify-center items-center text-xs cursor-pointer hover:bg-gray-100">
                            (Liceo) {role === 'student' ? 'Enrollment Form' : 'Load Sheet / DTR'}
                        </div>
                        {#if owner === 'no'}
                            <div class="border w-full h-20 flex justify-center items-center text-xs cursor-pointer hover:bg-gray-200">
                                Signed Letter / DOAS
                            </div>
                        {/if}
                    </div>
                {/if}
                {#if role === 'visitor' && owner === 'yes'}
                <div class="grid grid-cols-2 gap-2">
                        <div class="border w-full h-20 flex justify-center items-center text-xs cursor-pointer hover:bg-gray-200">
                        (LTO) Driver's License
                    </div>
                    <div class="border w-full h-20 flex justify-center items-center text-xs cursor-pointer hover:bg-gray-200">
                        Signed Letter / DOAS
                    </div>
                    </div>
                {/if}

                <div class="grid gap-2 {role === 'visitor' && owner === 'yes' ? 'grid-cols-2' : 'grid-cols-3'}">
                    {#if ['student', 'employee'].includes(role) || role === 'visitor' && owner === 'no'}
                    <div class="border w-full h-20 flex justify-center items-center text-xs cursor-pointer hover:bg-gray-200">
                        (LTO) Driver's License
                    </div>
                    {/if}
                    <div class="border w-full h-20 flex justify-center items-center text-xs cursor-pointer hover:bg-gray-100">
                        (LTO) Vehicle OR
                    </div>
                    <div class="border w-full h-20 flex justify-center items-center text-xs cursor-pointer hover:bg-gray-100">
                        (LTO) Vehicle CR
                    </div>
                </div>
            </div>
        </div>

        <p class="m-auto mt-4 text-xs">If you encounter any issues, contact <span class="underline" href="">osa@liceo.edu.ph</span></p>

    </div>
</div>