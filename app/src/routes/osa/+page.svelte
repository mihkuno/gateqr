<script lang="ts">
    let tab = $state('validation');
    let owner = $state('no');
    let role = $state('employee');
</script>

<div class="flex justify-center bg-gray-100 min-h-screen px-3 py-6 sm:px-4 sm:py-8">
    <div class="max-w-xl w-full flex flex-col gap-4">

        <div class="flex justify-between items-center">
            <h1 class="text-sm font-semibold text-gray-600">Applications</h1>
            <div>
                <a href="/osa/dashboard" class="border px-3 py-1.5 text-xs font-semibold bg-white hover:bg-gray-200 cursor-pointer">
                    View Dashboard
                </a>
                <a href="/osa/departments" class="border px-3 py-1.5 text-xs font-semibold bg-white hover:bg-gray-200 cursor-pointer">
                    Manage Departments
                </a>
            </div>
        </div>

        <!-- Tabs -->
        <div class="flex gap-2 flex-wrap sm:flex-nowrap">
            <button 
                onclick={() => tab = 'validation'}
                style={tab === 'validation' ? 'background-color: #e5e7eb;' : '#ffffff'}
                class="border p-2 flex-1 min-w-[calc(50%-4px)] sm:min-w-0 bg-white text-sm font-semibold cursor-pointer hover:bg-gray-200">
                Validation
            </button>
            <button 
                onclick={() => tab = 'distribution'}
                style={tab === 'distribution' ? 'background-color: #e5e7eb;' : '#ffffff'}
                class="border p-2 flex-1 min-w-[calc(50%-4px)] sm:min-w-0 bg-white text-sm font-semibold cursor-pointer hover:bg-gray-200">
                Distribution
            </button>
            <button 
                onclick={() => tab = 'monitoring'}
                style={tab === 'monitoring' ? 'background-color: #e5e7eb;' : '#ffffff'}
                class="border p-2 flex-1 min-w-[calc(50%-4px)] sm:min-w-0 bg-white text-sm font-semibold cursor-pointer hover:bg-gray-200">
                Monitoring
            </button>
            <button 
                onclick={() => tab = 'history'}
                style={tab === 'history' ? 'background-color: #e5e7eb;' : '#ffffff'}
                class="border p-2 flex-1 min-w-[calc(50%-4px)] sm:min-w-0 bg-white text-sm font-semibold cursor-pointer hover:bg-gray-200">
                History
            </button>
        </div>

        <div class="border p-4 flex flex-col gap-4 bg-white">
            
            <!-- Top section: QR + Details -->
            <div class="flex flex-col sm:flex-row gap-3 sm:gap-2 items-start">
                
                <!-- QR Code -->
                {#if tab !== 'validation'}
                    <div class="w-full sm:w-30 sm:h-30 h-20 shrink-0 border flex justify-center items-center text-xs cursor-pointer hover:bg-gray-200">
                        QR
                    </div>
                {/if}

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
                                <td class="font-medium pr-4 pb-1 whitespace-nowrap align-top">Role:</td>
                                <td class="pb-1">Student</td>
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

            <!-- <label for="schedule" class="text-xs">Reason for rejection</label>
            <p>pangit</p>
            <div class="flex">
                <input type="text" placeholder="what's the reason for rejection" class="w-full border" />
                <button class=" border p-2  cursor-pointer ">
                    Cancel
                </button>
                <button class=" border p-2 cursor-pointer">
                    Continue
                </button>
            </div>
            
            <label for="schedule" class="text-xs">Reason for revocation</label>
            <p>pangit</p>
            <div class="flex">
                <input type="text" placeholder="what's the reason for revocation" class="w-full border" />
                <button class=" border p-2  cursor-pointer ">
                    Cancel
                </button>
                <button class=" border p-2 cursor-pointer">
                    Continue
                </button>
            </div>
            
            <label for="schedule" class="text-xs">Set appointment schedule</label>
            <div class="flex">
                <input type="datetime-local" id="schedule" class="w-full border" />
                <button class=" border p-2  cursor-pointer ">
                    Cancel
                </button>
                <button class=" border p-2 cursor-pointer">
                    Continue
                </button>
            </div> -->
            
            <!-- Actions -->
            {#if tab !== 'history'}
                <div class="flex gap-2">
                    {#if tab === 'validation'}
                        <button class="flex-1 border p-3 text-sm cursor-pointer bg-red-200 hover:bg-red-300">
                            Reject
                        </button>
                        <button class="flex-1 border p-3 text-sm cursor-pointer bg-green-200 hover:bg-green-300">
                            Accept
                        </button>
                    {:else if tab === 'distribution'}
                        <button class="flex-1 border p-3 text-sm cursor-pointer bg-violet-200 hover:bg-violet-300">
                            Mark Delivered
                        </button>
                    {:else if tab === 'monitoring'}             
                        <button class="flex-1 border p-3 text-sm cursor-pointer bg-orange-200 hover:bg-orange-300">
                            Revoke Access
                        </button>
                    {/if}
                </div>
            {/if}

        </div>

    </div>
</div>